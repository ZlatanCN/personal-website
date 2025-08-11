const ZoomIn = () => {
  return (
    <svg
      className={'lucide lucide-zoom-in-icon lucide-zoom-in'}
      fill={'none'}
      height={'24'}
      stroke={'currentColor'}
      strokeLinecap={'round'}
      strokeLinejoin={'round'}
      strokeWidth={'2'}
      viewBox={'0 0 24 24'}
      width={'24'}
      xmlns={'http://www.w3.org/2000/svg'}
    >
      <title>Zoom In Icon</title>
      <circle cx={'11'} cy={'11'} r={'8'} />
      <line x1={'21'} x2={'16.65'} y1={'21'} y2={'16.65'} />
      <line x1={'11'} x2={'11'} y1={'8'} y2={'14'} />
      <line x1={'8'} x2={'14'} y1={'11'} y2={'11'} />
    </svg>
  )
}

ZoomIn.displayName = 'ZoomIn'

export { ZoomIn }
