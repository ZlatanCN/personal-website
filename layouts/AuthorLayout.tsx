import type { Authors } from 'contentlayer/generated'
import type { ReactNode } from 'react'
import Image from '@/components/Image'
import SocialIcon from '@/components/social-icons'
import avatarImage from '/public/static/images/avatar.avif'

interface Props {
  children: ReactNode
  content: Omit<Authors, '_id' | '_raw' | 'body'>
}

export default function AuthorLayout({ children, content }: Props) {
  const { name, avatar, occupation, company, email, douyin, github } = content

  return (
    <div className={'divide-y divide-gray-200 dark:divide-gray-700'}>
      <div className={'space-y-2 pt-6 pb-8 md:space-y-5'}>
        <h1
          className={
            'font-extrabold text-3xl text-gray-900 leading-9 tracking-tight sm:text-4xl sm:leading-10 md:text-6xl md:leading-14 dark:text-gray-100'
          }
        >
          About
        </h1>
      </div>
      <div className={'items-start space-y-2 xl:grid xl:grid-cols-3 xl:gap-x-8 xl:space-y-0'}>
        <div className={'flex flex-col items-center space-x-2 pt-8'}>
          {avatar && (
            <Image
              alt={'avatar'}
              blurDataURL={avatarImage.blurDataURL}
              className={'h-48 w-48 rounded-full'}
              height={192}
              placeholder={'blur'}
              src={avatarImage.src}
              width={192}
            />
          )}
          <h3 className={'pt-4 pb-2 font-bold text-2xl leading-8 tracking-tight'}>{name}</h3>
          <div className={'text-gray-500 dark:text-gray-400'}>{occupation}</div>
          <div className={'text-gray-500 dark:text-gray-400'}>{company}</div>
          <div className={'flex space-x-3 pt-6'}>
            <SocialIcon href={`mailto:${email}`} kind={'mail'} />
            <SocialIcon href={github} kind={'github'} />
            <SocialIcon href={douyin} kind={'douyin'} />
          </div>
        </div>
        <div className={'prose dark:prose-invert max-w-none pt-8 pb-8 xl:col-span-2'}>
          {children}
        </div>
      </div>
    </div>
  )
}
