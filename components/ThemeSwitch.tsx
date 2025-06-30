'use client';

import { memo, useCallback, useEffect, useState } from 'react';
import { useTheme } from 'next-themes';
import { Transition } from '@headlessui/react';
import { Blank, Monitor, Moon, Sun } from '@/components/icons';

const ThemeSwitch = memo(() => {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  const handleThemeChange = useCallback(() => {
    switch (theme) {
      case 'system':
        setTheme('light');
        break;
      case 'light':
        setTheme('dark');
        break;
      case 'dark':
        setTheme('system');
        break;
    }
  }, [theme]);

  useEffect(() => setMounted(true), []);

  return (
    <div className={'flex items-center'}>
      <button
        aria-label={'Theme switcher'}
        className={
          'hover:text-primary-500 dark:hover:text-primary-400 flex items-center justify-center rounded-md p-2'
        }
        onClick={handleThemeChange}
      >
        {mounted ? (
          <div className={'relative h-6 w-6'}>
            {/* Monitor Icon - System Theme */}
            <Transition
              show={theme === 'system'}
              enter={'transition-all duration-200 ease-out'}
              enterFrom={'scale-50 rotate-90 opacity-0'}
              enterTo={'scale-100 rotate-0 opacity-100'}
              leave={'transition-all duration-200 ease-in'}
              leaveFrom={'scale-100 rotate-0 opacity-100'}
              leaveTo={'scale-50 rotate-90 opacity-0'}
            >
              <div className={'absolute inset-0'}>
                <Monitor />
              </div>
            </Transition>

            {/* Sun Icon - Light Theme */}
            <Transition
              show={theme === 'light'}
              enter={'transition-all duration-200 ease-out'}
              enterFrom={'scale-50 rotate-90 opacity-0'}
              enterTo={'scale-100 rotate-0 opacity-100'}
              leave={'transition-all duration-200 ease-in'}
              leaveFrom={'scale-100 rotate-0 opacity-100'}
              leaveTo={'scale-50 rotate-90 opacity-0'}
            >
              <div className={'absolute inset-0'}>
                <Sun />
              </div>
            </Transition>

            {/* Moon Icon - Dark Theme */}
            <Transition
              show={theme === 'dark'}
              enter={'transition-all duration-200 ease-out'}
              enterFrom={'scale-50 rotate-90 opacity-0'}
              enterTo={'scale-100 rotate-0 opacity-100'}
              leave={'transition-all duration-200 ease-in'}
              leaveFrom={'scale-100 rotate-0 opacity-100'}
              leaveTo={'scale-50 rotate-90 opacity-0'}
            >
              <div className={'absolute inset-0'}>
                <Moon />
              </div>
            </Transition>
          </div>
        ) : (
          <Blank />
        )}
      </button>
    </div>
  );
});

ThemeSwitch.displayName = 'ThemeSwitch';

export { ThemeSwitch };
