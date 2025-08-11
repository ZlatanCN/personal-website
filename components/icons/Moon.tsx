import { memo } from 'react'

const Moon = memo(() => {
  return (
    <svg
      className={'h-6 w-6 cursor-pointer opacity-100 transition-opacity duration-300 ease-in-out'}
      fill={'currentColor'}
      viewBox={'0 0 20 20'}
      xmlns={'http://www.w3.org/2000/svg'}
    >
      <title>Toggle Dark Mode</title>
      <path d={'M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z'} />
    </svg>
  )
})

Moon.displayName = 'Moon'

export { Moon }
