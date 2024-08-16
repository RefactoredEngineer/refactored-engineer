import { Octokit } from 'octokit'
import { tursoClient } from '@/utils/tursoClient'
import NextAuth from 'next-auth'
import GithubProvider, { GithubProfile } from 'next-auth/providers/github'

const client = tursoClient()
const octokit = new Octokit({ auth: process.env.GITHUB_PERSONAL_ACCESS_TOKEN })

async function doesUserExist(id: number) {
  const exists = await client.execute({
    sql: 'SELECT gh_id FROM users WHERE gh_id = ?;',
    args: [id],
  })
  return exists.rows.length > 0
}

async function getTeamId() {
  const team = await octokit.rest.teams.getByName({
    org: 'refactoredengineer',
    team_slug: 'whalecast',
  })
  return team.data.id
}

async function inviteUserToGitHubOrg(userId: number) {
  const teamId = await getTeamId()
  await octokit.rest.orgs.createInvitation({
    org: 'refactoredengineer',
    team_ids: [teamId],
    invitee_id: userId,
  })
}

async function trackUser({
  id,
  login,
  email,
  profileImage,
}: {
  id: number
  login: string
  email: string
  profileImage: string
}) {
  await client.execute({
    sql: 'INSERT INTO users (gh_id, gh_username, email_address, profile_img) VALUES (?, ?, ?, ?);',
    args: [id, login, email, profileImage],
  })
}

const handler = NextAuth({
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID || '',
      clientSecret: process.env.GITHUB_SECRET || '',
    }),
  ],
  callbacks: {
    async signIn({ user, profile }) {
      const { id: id_str, email: userEmail, image } = user
      const id = parseInt(id_str, 10)
      const { login } = profile as GithubProfile

      if (!(await doesUserExist(id))) {
        await trackUser({ id, login, email: userEmail!, profileImage: image! })
      }
      await inviteUserToGitHubOrg(id)
      return true
    },
  },
})

export { handler as GET, handler as POST }
