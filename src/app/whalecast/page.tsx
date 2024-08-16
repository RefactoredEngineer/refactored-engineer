import { type Metadata } from 'next'
import Image from 'next/image'

import { Card } from '@/components/Card'
import { Link } from '@/components/Link'
import { SimpleLayout } from '@/components/SimpleLayout'
import youtube from '@/images/logos/youtube.svg'
import { GithubSSO } from './GithubSSO'
import { Suspense } from 'react'

export const metadata: Metadata = {
  title: 'WhaleCast',
  description:
    'WhaleCast is a better way to consume podcasts. The source code is available on GitHub',
}

function LinkIcon(props: React.ComponentPropsWithoutRef<'svg'>) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path
        d="M15.712 11.823a.75.75 0 1 0 1.06 1.06l-1.06-1.06Zm-4.95 1.768a.75.75 0 0 0 1.06-1.06l-1.06 1.06Zm-2.475-1.414a.75.75 0 1 0-1.06-1.06l1.06 1.06Zm4.95-1.768a.75.75 0 1 0-1.06 1.06l1.06-1.06Zm3.359.53-.884.884 1.06 1.06.885-.883-1.061-1.06Zm-4.95-2.12 1.414-1.415L12 6.344l-1.415 1.413 1.061 1.061Zm0 3.535a2.5 2.5 0 0 1 0-3.536l-1.06-1.06a4 4 0 0 0 0 5.656l1.06-1.06Zm4.95-4.95a2.5 2.5 0 0 1 0 3.535L17.656 12a4 4 0 0 0 0-5.657l-1.06 1.06Zm1.06-1.06a4 4 0 0 0-5.656 0l1.06 1.06a2.5 2.5 0 0 1 3.536 0l1.06-1.06Zm-7.07 7.07.176.177 1.06-1.06-.176-.177-1.06 1.06Zm-3.183-.353.884-.884-1.06-1.06-.884.883 1.06 1.06Zm4.95 2.121-1.414 1.414 1.06 1.06 1.415-1.413-1.06-1.061Zm0-3.536a2.5 2.5 0 0 1 0 3.536l1.06 1.06a4 4 0 0 0 0-5.656l-1.06 1.06Zm-4.95 4.95a2.5 2.5 0 0 1 0-3.535L6.344 12a4 4 0 0 0 0 5.656l1.06-1.06Zm-1.06 1.06a4 4 0 0 0 5.657 0l-1.061-1.06a2.5 2.5 0 0 1-3.535 0l-1.061 1.06Zm7.07-7.07-.176-.177-1.06 1.06.176.178 1.06-1.061Z"
        fill="currentColor"
      />
    </svg>
  )
}

export default function WhaleCast() {
  return (
    <SimpleLayout
      title="WhaleCast"
      intro="WhaleCast is a better way to learn from podcasts. It gives you a way to listen to podcasts on the topics you are interested in."
    >
      <div className="space-y-20">
        <Suspense fallback={<div>Loading...</div>}>
          <div>
            <GithubSSO />
          </div>
        </Suspense>
        <p className="text-base text-zinc-600 dark:text-zinc-400">
          WhaleCast is a better way to learn from podcasts. I&apos;m building
          the app in public. To follow along, subscribe to the{' '}
          <Link href="https://www.youtube.com/@RefactoredEngineer">
            Refactored Engineer YouTube channel.
          </Link>
        </p>
        <ul role="list" className="grid grid-cols-1 gap-x-12 gap-y-16">
          <Card as="li" className="items-center">
            <div className="z-10 flex h-40 w-40 items-center justify-center group-hover:scale-100 group-hover:opacity-100 sm:-inset-x-6 sm:rounded-2xl">
              <Image src={youtube} alt="" className="h-40 w-40" />
            </div>
            <h2 className="mt-3 text-base font-semibold text-zinc-800 dark:text-zinc-100">
              <Card.Link href="#">
                Refactored Engineering YouTube channel
              </Card.Link>
            </h2>
            <Card.Description>
              Follow along with me building the app.
            </Card.Description>
            <p className="relative z-10 mt-6 flex text-sm font-medium text-zinc-400 transition group-hover:text-teal-500 dark:text-zinc-200">
              <LinkIcon className="h-6 w-6 flex-none" />
              <span className="ml-2">Subscribe on YouTube</span>
            </p>
          </Card>
        </ul>
      </div>
    </SimpleLayout>
  )
}
