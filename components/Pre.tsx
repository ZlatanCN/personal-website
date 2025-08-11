'use client'

import { useState, useRef, ReactNode } from 'react'
import { Clipboard } from '@/components/icons'

type PreProps = {
  children: ReactNode
}

const Pre = ({ children }: PreProps) => {
  const textInput = useRef<HTMLDivElement | null>(null)
  const [hovered, setHovered] = useState<boolean>(false)
  const [copied, setCopied] = useState<boolean>(false)

  const onEnter = () => {
    setHovered(true)
  }

  const onExit = () => {
    setHovered(false)
    setCopied(false)
  }

  const onCopy = async () => {
    try {
      if (textInput.current) {
        await navigator.clipboard.writeText(textInput.current.textContent || '')
      }
      setCopied(true)
    } catch (error) {
      console.error('Failed to copy text:', error)
    }
  }

  return (
    <div ref={textInput} onMouseEnter={onEnter} onMouseLeave={onExit} className={'relative'}>
      <button
        className={`absolute top-2 right-2 size-8 cursor-pointer rounded border-2 bg-transparent p-1 transition-opacity duration-200 ${
          hovered ? 'opacity-100' : 'opacity-0'
        } ${
          copied
            ? 'border-green-400 focus:border-green-400 focus:outline-none'
            : 'border-gray-700 dark:border-gray-300'
        }`}
        onClick={onCopy}
      >
        <Clipboard copied={copied} />
      </button>
      <pre>{children}</pre>
    </div>
  )
}

Pre.displayName = 'Pre'

export { Pre }
