import { genPageMetadata } from 'app/seo'
import Card from '@/components/Card'
import projectsData from '@/data/projectsData'

export const metadata = genPageMetadata({ title: 'Projects' })

export default function Projects() {
  return (
    <div className={'divide-y divide-gray-200 dark:divide-gray-700'}>
      <div className={'space-y-2 pt-6 pb-8 md:space-y-5'}>
        <h1
          className={
            'font-extrabold text-3xl text-gray-900 leading-9 tracking-tight sm:text-4xl sm:leading-10 md:text-6xl md:leading-14 dark:text-gray-100'
          }
        >
          Projects
        </h1>
        <p className={'text-gray-500 text-lg leading-7 dark:text-gray-400'}>
          Feel free to explore and reach out if you have any questions or feedback!
        </p>
      </div>
      <div className={'container py-12'}>
        <div className={'-m-4 flex flex-wrap'}>
          {projectsData.map(d => (
            <Card
              description={d.description}
              href={d.href}
              imgSrc={d.imgSrc}
              key={d.title}
              title={d.title}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
