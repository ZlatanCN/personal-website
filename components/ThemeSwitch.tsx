'use client';

import { memo, useEffect, useState } from 'react';
import { useTheme } from 'next-themes';
import { Blank, Monitor, Moon, Sun } from '@/components/icons';

const ThemeSwitch = memo(() => {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => setMounted(true), []);

  return (
    <div className={'flex items-center'}>
      <button
        aria-label={'Theme switcher'}
        className={
          'hover:text-primary-500 dark:hover:text-primary-400 flex items-center justify-center rounded-md p-2'
        }
        onClick={() => {
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
        }}
      >
        {mounted ? (
          theme === 'system' ? (
            <Monitor />
          ) : theme === 'light' ? (
            <Sun />
          ) : (
            <Moon />
          )
        ) : (
          <Blank />
        )}
      </button>
    </div>
  );
});

ThemeSwitch.displayName = 'ThemeSwitch';

export { ThemeSwitch };
