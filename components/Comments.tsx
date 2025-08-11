'use client'

import { Comments as CommentsComponent } from 'pliny/comments'
import { useEffect, useState } from 'react'
import siteMetadata from '@/data/siteMetadata'

export default function Comments({ slug }: { slug: string }) {
  const [loadComments, setLoadComments] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setLoadComments(true)
          }
        })
      },
      {
        rootMargin: '0px 0px 20% 0px',
      }
    )

    const commentSection = document.querySelector('#comment')
    if (commentSection) {
      observer.observe(commentSection)
    }

    return () => {
      if (commentSection) {
        observer.unobserve(commentSection)
      }
      observer.disconnect()
    }
  }, [])

  return (
    <>
      {siteMetadata.comments?.provider ? (
        loadComments ? (
          <CommentsComponent commentsConfig={siteMetadata.comments} slug={slug} />
        ) : (
          <button onClick={() => setLoadComments(true)} type={'button'}>
            Load Comments
          </button>
        )
      ) : null}
    </>
  )
}
