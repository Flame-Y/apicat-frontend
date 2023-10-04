'use client'; // Error components must be Client Components

import { useEffect } from 'react';
import Image from 'next/image';

export default function Error({ error, reset }: { error: Error; reset: () => void }) {
    useEffect(() => {
        // Log the error to an error reporting service
        console.error(error);
    }, [error]);

    return (
        <div className="relative h-screen overflow-hidden bg-indigo-900">
            <Image
                src="/404.svg"
                alt="A person standing on a cliff looking at the stars"
                className="absolute h-full w-full object-cover"
                width={200}
                height={200}
            />
            <div className="absolute inset-0 bg-black opacity-25"></div>
            <div className="container relative z-10 mx-auto flex items-center px-6 py-32 md:px-12 xl:py-40">
                <div className="relative z-10 flex w-full flex-col items-center ">
                    <h1 className="mt-4 text-center text-5xl font-extrabold leading-tight text-white">
                        你来到了没有知识的荒原
                    </h1>
                    <p className="my-44 animate-bounce font-mono text-8xl font-extrabold text-white">404</p>
                </div>
            </div>
        </div>
    );
}
