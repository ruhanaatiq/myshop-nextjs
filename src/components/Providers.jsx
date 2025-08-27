'use client';

import { SessionProvider } from 'next-auth/react';
import { ThemeProvider, useTheme } from 'next-themes';
import { useEffect } from 'react';

// Keep Tailwind `dark:` in sync with the active theme
function ThemeClassSync() {
  const { resolvedTheme } = useTheme();
  useEffect(() => {
    document.documentElement.classList.toggle('dark', resolvedTheme === 'dark');
  }, [resolvedTheme]);
  return null;
}

export default function Providers({ children }) {
  return (
    <SessionProvider>
      <ThemeProvider
        attribute="data-theme"   // DaisyUI reads this
        defaultTheme="light"
        enableSystem={false}
        storageKey="theme"
        themes={['light', 'dark', 'cupcake']}
      >
        <ThemeClassSync />
        {children}
      </ThemeProvider>
    </SessionProvider>
  );
}
