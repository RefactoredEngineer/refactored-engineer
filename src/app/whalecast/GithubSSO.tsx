'use client'

import { GitHubIcon } from '@/components/SocialIcons'
import whalecastLogo from '@/images/logos/whalecast.svg'
import { signIn } from 'next-auth/react'
import Image from 'next/image'
import { useSearchParams } from 'next/navigation'
import { useRef, useEffect, useState } from 'react'

export function GithubSSO() {
  const params = useSearchParams()
  const [status, setStatus] = useState<string | null>(null)
  useEffect(() => {
    const currentStatus = params.get('status')
    setStatus(currentStatus ? currentStatus.toLowerCase() : null)
  }, [params])
  return (
    <>
      <div className="col-span-6 mx-auto w-full rounded-lg shadow sm:max-w-lg md:mt-0 xl:p-0 dark:bg-zinc-800 dark:shadow-zinc-400">
        <div className="space-y-4 p-6 sm:p-8 lg:space-y-6">
          <h1 className="text-xl font-bold leading-tight tracking-tight text-zinc-600 sm:text-2xl dark:text-zinc-400">
            WhaleCast Source Code
          </h1>

          {status === 'success' && (
            <div
              className="mb-4 rounded-lg bg-green-50 p-4 text-sm text-green-800 dark:bg-zinc-800 dark:text-green-400"
              role="alert"
            >
              <span className="font-medium">Success!</span> Check GitHub for an
              invite to the repo.
            </div>
          )}
          <div className="flex justify-center">
            <Image
              src={whalecastLogo}
              alt=""
              sizes="(min-width: 10rem) 32rem, 20rem, 10rem"
              className="h-full w-40"
            />
          </div>

          <p className="text-sm font-light text-zinc-600 dark:text-zinc-400">
            Connecting your GitHub source code will give your GitHub account
            access to the private repository containing the WhaleCast source
            code.
          </p>
          <div className="items-center space-y-3 sm:flex sm:space-x-4 sm:space-y-0">
            <a
              href="#"
              onClick={async (e) => {
                e.preventDefault()
                signIn('github', { callbackUrl: '/whalecast?status=success' })
              }}
              className="inline-flex w-full items-center justify-center rounded-lg border border-zinc-200 px-5 py-2.5 text-sm font-medium text-zinc-600 hover:bg-zinc-100 hover:text-zinc-800 focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:border-zinc-600 dark:text-zinc-400 dark:hover:bg-zinc-700 dark:hover:text-white dark:focus:ring-zinc-700"
            >
              <GitHubIcon className="mr-2 h-5 w-5 text-zinc-600 dark:text-zinc-400" />
              Connect GitHub Acccount
            </a>
          </div>
        </div>
      </div>
    </>
  )
}
