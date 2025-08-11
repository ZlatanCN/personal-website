import { memo } from 'react'

const Monitor = memo(() => {
  return (
    <svg
      className={'h-6 w-6 cursor-pointer opacity-100 transition-opacity duration-300 ease-in-out'}
      fill={'none'}
      stroke={'currentColor'}
      strokeLinecap={'round'}
      strokeLinejoin={'round'}
      strokeWidth={'2'}
      viewBox={'0 0 20 20'}
      xmlns={'http://www.w3.org/2000/svg'}
    >
      <title>Monitor</title>
      <rect height={'10'} rx={'2'} ry={'2'} width={'14'} x={'3'} y={'3'}></rect>
      <line x1={'7'} x2={'13'} y1={'17'} y2={'17'}></line>
      <line x1={'10'} x2={'10'} y1={'13'} y2={'17'}></line>
    </svg>
  )
})

Monitor.displayName = 'Monitor'

export { Monitor }
