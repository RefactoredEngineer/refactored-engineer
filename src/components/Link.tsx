import NextLink from 'next/link'

export function Link({
  href,
  children,
}: {
  href: string
  children: React.ReactNode
}) {
  return (
    <NextLink
      href={href}
      className="text-zinc-400 hover:text-teal-500 dark:text-zinc-200 dark:hover:text-teal-400"
    >
      {children}
    </NextLink>
  )
}
