'use client';
import Nav from '../components/nav';
import { useState, useEffect } from 'react';
import { SessionProvider } from 'next-auth/react';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    // 从localStorage中获取darkMode
    const [darkMode, setDarkMode] = useState(
        typeof window !== 'undefined' && localStorage.getItem('darkMode') !== null
            ? JSON.parse(localStorage.getItem('darkMode') || '')
            : false
    );

    useEffect(() => {
        document.documentElement.classList.remove(darkMode ? 'light' : 'dark');
        document.documentElement.classList.add(darkMode ? 'dark' : 'light');
    }, [darkMode]);
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
            localStorage.setItem('darkMode', JSON.stringify(!isDark));
        });

        transition.ready.then(() => {
            const clipPath = [`circle(0px at ${x}px ${y}px)`, `circle(${endRadius}px at ${x}px ${y}px)`];
            document.documentElement.animate(
                {
                    clipPath: isDark ? [...clipPath].reverse() : clipPath
                },
                {
                    duration: 500,
                    easing: 'ease-in',
                    pseudoElement: isDark ? '::view-transition-old(root)' : '::view-transition-new(root)'
                }
            );
        });
    }

    return (
        <SessionProvider>
            <div className="absolute top-0 z-[-2] h-screen w-screen bg-white bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))] dark:bg-gray-800">
                <main className="relative h-screen overflow-hidden rounded-2xl">
                    <div className="flex items-start justify-between">
                        <Nav darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
                        <div className="flex w-full flex-col pl-0 md:space-y-4 md:p-4">
                            <section>{children}</section>
                        </div>
                    </div>
                </main>
            </div>
        </SessionProvider>
    );
}
