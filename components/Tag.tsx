import { slug } from 'github-slugger'
import Link from 'next/link'

interface Props {
  text: string
}

const Tag = ({ text }: Props) => {
  return (
    <Link
      className={
        'mr-3 font-medium text-primary-500 text-sm hover:text-primary-600 dark:hover:text-primary-400'
      }
      href={`/tags/${slug(text)}`}
    >
      {text.split(' ').join('-')}
    </Link>
  )
}

export default Tag
