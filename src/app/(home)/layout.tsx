'use client';
import Nav from '../components/nav';
import { useEffect } from 'react';
import { SessionProvider } from 'next-auth/react';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    // useEffect(() => {
    //     if (typeof window !== 'undefined' && localStorage.getItem('theme') !== null)
    //         if (localStorage.getItem('theme') === 'dark') document.documentElement.classList.add('dark');
    // }, []);
    // 点击切换darkMode
    function toggleDarkMode(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
        const x = event.clientX;
        const y = event.clientY;
        const endRadius = Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y));

        let isDark: boolean;

        const transition = (document as any).startViewTransition(() => {
            const root = document.documentElement;
            isDark = root.classList.contains('dark');
            root.classList.remove(isDark ? 'dark' : 'light');
            root.classList.add(isDark ? 'light' : 'dark');
            //存入localStorage
            localStorage.setItem('theme', isDark ? 'light' : 'dark');
        });

        transition.ready.then(() => {
            const clipPath = [`circle(0px at ${x}px ${y}px)`, `circle(${endRadius}px at ${x}px ${y}px)`];
            document.documentElement.animate(
                {
                    clipPath: isDark ? [...clipPath].reverse() : clipPath
                },
                {
                    duration: 500,
                    easing: 'ease-in-out',
                    pseudoElement: isDark ? '::view-transition-old(root)' : '::view-transition-new(root)'
                }
            );
        });
    }

    return (
        <SessionProvider>
            <script
                dangerouslySetInnerHTML={{
                    __html: `
                (function () {
                  function setTheme(newTheme) {
                    window.__theme = newTheme;
                    if (newTheme === 'dark') {
                      document.documentElement.classList.add('dark');
                    } else if (newTheme === 'light') {
                      document.documentElement.classList.remove('dark');
                    }
                  }

                  var preferredTheme;
                  try {
                    preferredTheme = localStorage.getItem('theme');
                  } catch (err) { }

                  window.__setPreferredTheme = function(newTheme) {
                    preferredTheme = newTheme;
                    setTheme(newTheme);
                    try {
                      localStorage.setItem('theme', newTheme);
                    } catch (err) { }
                  };

                  var initialTheme = preferredTheme;
                  var darkQuery = window.matchMedia('(prefers-color-scheme: dark)');
                  if (!initialTheme) {
                    initialTheme = darkQuery.matches ? 'dark' : 'light';
                  }
                  setTheme(initialTheme);
                  darkQuery.addEventListener('change', function (e) {
                    if (!preferredTheme) {
                      setTheme(e.matches ? 'dark' : 'light');
                    }
                  });
                })();
              `
                }}
            />
            <div className="absolute top-0 z-[-2] h-screen w-screen bg-white bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))] dark:bg-gray-800">
                <main className="relative h-screen overflow-hidden rounded-2xl">
                    <div className="flex items-start justify-between">
                        <Nav toggleDarkMode={toggleDarkMode} />
                        <div className="flex w-full flex-col pl-0 md:space-y-4 ">
                            <section>{children}</section>
                        </div>
                    </div>
                </main>
            </div>
        </SessionProvider>
    );
}
