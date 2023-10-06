import Link from 'next/link';
export default function Page() {
    return (
        <div className="flex w-full max-w-md flex-col rounded-lg bg-white px-4 py-8 shadow dark:bg-gray-800 sm:px-6 md:px-8 lg:px-10">
            <div className="mb-6 self-center text-xl font-light text-gray-600 dark:text-white sm:text-2xl">
                Login To Your Account
            </div>
            <div className="item-center flex gap-4">
                <button
                    type="button"
                    className="flex w-full items-center justify-center rounded-lg bg-black px-4 py-2 text-center text-base font-semibold text-white shadow-md transition duration-200 ease-in hover:bg-white hover:text-black focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2  focus:ring-offset-blue-200 "
                >
                    <svg
                        className="mb-0.5 mr-2"
                        viewBox="0 0 16 16"
                        width="20"
                        height="20"
                        fill="currentColor"
                        // style="display:inline-block;user-select:none;vertical-align:text-bottom;overflow:visible"
                    >
                        <path d="M8 0c4.42 0 8 3.58 8 8a8.013 8.013 0 0 1-5.45 7.59c-.4.08-.55-.17-.55-.38 0-.27.01-1.13.01-2.2 0-.75-.25-1.23-.54-1.48 1.78-.2 3.65-.88 3.65-3.95 0-.88-.31-1.59-.82-2.15.08-.2.36-1.02-.08-2.12 0 0-.67-.22-2.2.82-.64-.18-1.32-.27-2-.27-.68 0-1.36.09-2 .27-1.53-1.03-2.2-.82-2.2-.82-.44 1.1-.16 1.92-.08 2.12-.51.56-.82 1.28-.82 2.15 0 3.06 1.86 3.75 3.64 3.95-.23.2-.44.55-.51 1.07-.46.21-1.61.55-2.33-.66-.15-.24-.6-.83-1.23-.82-.67.01-.27.38.01.53.34.19.73.9.82 1.13.16.45.68 1.31 2.69.94 0 .67.01 1.3.01 1.49 0 .21-.15.45-.55.38A7.995 7.995 0 0 1 0 8c0-4.42 3.58-8 8-8Z"></path>
                    </svg>
                    Github
                </button>
            </div>
            <div className="mt-8">
                <form action="#" autoComplete="off">
                    <div className="mb-2 flex flex-col">
                        <div className="relative flex ">
                            <span className="inline-flex items-center rounded-l-md border-b border-l border-t border-gray-300 bg-white px-3 text-sm text-gray-500 shadow-sm">
                                <svg
                                    width="15"
                                    height="15"
                                    fill="currentColor"
                                    viewBox="0 0 1792 1792"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path d="M1792 710v794q0 66-47 113t-113 47h-1472q-66 0-113-47t-47-113v-794q44 49 101 87 362 246 497 345 57 42 92.5 65.5t94.5 48 110 24.5h2q51 0 110-24.5t94.5-48 92.5-65.5q170-123 498-345 57-39 100-87zm0-294q0 79-49 151t-122 123q-376 261-468 325-10 7-42.5 30.5t-54 38-52 32.5-57.5 27-50 9h-2q-23 0-50-9t-57.5-27-52-32.5-54-38-42.5-30.5q-91-64-262-182.5t-205-142.5q-62-42-117-115.5t-55-136.5q0-78 41.5-130t118.5-52h1472q65 0 112.5 47t47.5 113z"></path>
                                </svg>
                            </span>
                            <input
                                type="text"
                                id="sign-in-email"
                                className=" w-full flex-1 appearance-none rounded-r-lg border border-gray-300 bg-white px-4 py-2 text-base text-gray-700 placeholder-gray-400 shadow-sm focus:border-transparent focus:outline-none focus:ring-2 focus:ring-yellow-600"
                                placeholder="Your email"
                            />
                        </div>
                    </div>
                    <div className="mb-6 flex flex-col">
                        <div className="relative flex ">
                            <span className="inline-flex items-center  rounded-l-md border-b border-l border-t border-gray-300 bg-white  px-3 text-sm text-gray-500 shadow-sm">
                                <svg
                                    width="15"
                                    height="15"
                                    fill="currentColor"
                                    viewBox="0 0 1792 1792"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path d="M1376 768q40 0 68 28t28 68v576q0 40-28 68t-68 28h-960q-40 0-68-28t-28-68v-576q0-40 28-68t68-28h32v-320q0-185 131.5-316.5t316.5-131.5 316.5 131.5 131.5 316.5q0 26-19 45t-45 19h-64q-26 0-45-19t-19-45q0-106-75-181t-181-75-181 75-75 181v320h736z"></path>
                                </svg>
                            </span>
                            <input
                                type="password"
                                id="sign-in-email"
                                className=" w-full flex-1 appearance-none rounded-r-lg border border-gray-300 bg-white px-4 py-2 text-base text-gray-700 placeholder-gray-400 shadow-sm focus:border-transparent focus:outline-none focus:ring-2 focus:ring-yellow-600"
                                placeholder="Your password"
                            />
                        </div>
                    </div>
                    <div className="-mt-4 mb-6 flex items-center">
                        <div className="ml-auto flex">
                            <a
                                href="#"
                                className="inline-flex text-xs font-thin text-gray-500 hover:text-gray-700 dark:text-gray-100 dark:hover:text-white sm:text-sm"
                            >
                                Forgot Your Password?
                            </a>
                        </div>
                    </div>
                    <div className="flex w-full">
                        <button
                            type="submit"
                            className="w-full rounded-lg  bg-yellow-600 px-4 py-2 text-center text-base font-semibold text-white shadow-md transition duration-200 ease-in hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2  focus:ring-offset-yellow-200 "
                        >
                            Login
                        </button>
                    </div>
                </form>
            </div>
            <div className="mt-6 flex items-center justify-center">
                <a
                    href="#"
                    target="_blank"
                    className="inline-flex items-center text-center text-xs font-thin text-gray-500 hover:text-gray-700 dark:text-gray-100 dark:hover:text-white"
                >
                    <Link className="ml-2" href="/register">
                        You don&#x27;t have an account?
                    </Link>
                </a>
            </div>
        </div>
    );
}
