'use client'

import { Transition } from '@headlessui/react'
import { useTheme } from 'next-themes'
import { memo, useCallback, useEffect, useState } from 'react'
import { Blank, Monitor, Moon, Sun } from '@/components/icons'

const ThemeSwitch = memo(() => {
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme()

  const handleThemeChange = useCallback(() => {
    switch (theme) {
      case 'system':
        setTheme('light')
        break
      case 'light':
        setTheme('dark')
        break
      case 'dark':
        setTheme('system')
        break
    }
  }, [setTheme, theme])

  useEffect(() => setMounted(true), [])

  return (
    <div className={'flex items-center'}>
      <div className={'flex items-center justify-center rounded-md p-2'}>
        {mounted ? (
          <button
            aria-label={'Theme switcher'}
            className={
              'relative h-6 w-6 transition-colors duration-300 hover:text-primary-500 dark:hover:text-primary-400'
            }
            onClick={handleThemeChange}
            type={'button'}
          >
            {/* Monitor Icon - System Theme */}
            <Transition
              enter={'transition-all duration-300 ease-out'}
              enterFrom={'scale-50 rotate-90 opacity-0'}
              enterTo={'scale-100 rotate-0 opacity-100'}
              leave={'transition-all duration-300 ease-in'}
              leaveFrom={'scale-100 rotate-0 opacity-100'}
              leaveTo={'scale-50 rotate-90 opacity-0'}
              show={theme === 'system'}
            >
              <div className={'absolute inset-0'}>
                <Monitor />
              </div>
            </Transition>

            {/* Sun Icon - Light Theme */}
            <Transition
              enter={'transition-all duration-300 ease-out'}
              enterFrom={'scale-50 rotate-90 opacity-0'}
              enterTo={'scale-100 rotate-0 opacity-100'}
              leave={'transition-all duration-300 ease-in'}
              leaveFrom={'scale-100 rotate-0 opacity-100'}
              leaveTo={'scale-50 rotate-90 opacity-0'}
              show={theme === 'light'}
            >
              <div className={'absolute inset-0'}>
                <Sun />
              </div>
            </Transition>

            {/* Moon Icon - Dark Theme */}
            <Transition
              enter={'transition-all duration-300 ease-out'}
              enterFrom={'scale-50 rotate-90 opacity-0'}
              enterTo={'scale-100 rotate-0 opacity-100'}
              leave={'transition-all duration-300 ease-in'}
              leaveFrom={'scale-100 rotate-0 opacity-100'}
              leaveTo={'scale-50 rotate-90 opacity-0'}
              show={theme === 'dark'}
            >
              <div className={'absolute inset-0'}>
                <Moon />
              </div>
            </Transition>
          </button>
        ) : (
          <Blank />
        )}
      </div>
    </div>
  )
})

ThemeSwitch.displayName = 'ThemeSwitch'

export { ThemeSwitch }
