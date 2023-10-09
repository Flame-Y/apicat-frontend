'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
export default function Nav(props) {
    const pathName = usePathname();
    return (
        <div className="relative my-4 ml-4 hidden h-screen w-80 shadow-lg lg:block">
            <div className="h-full rounded-2xl bg-white dark:bg-gray-700">
                <div className="flex items-center justify-center pt-6">
                    <Image src="/cat.png" alt="Picture of the author" width={50} height={50} />
                    <button
                        class="rounded-md border p-2 outline-none  dark:border-gray-900/50 dark:bg-gray-700 dark:text-gray-100"
                        onClick={props?.toggleDarkMode}
                    >
                        切换主题
                    </button>
                </div>
                <nav className="mt-6">
                    <div>
                        <Link
                            href="/dashboard"
                            className={`${
                                pathName === '/dashboard'
                                    ? 'border-r-4 border-blue-500 bg-gradient-to-r from-white to-blue-100 text-blue-500 dark:border-blue-900 dark:bg-gradient-to-r dark:from-black dark:to-blue-500 dark:text-gray-100'
                                    : 'text-gray-500'
                            } my-2 flex w-full items-center justify-start p-4 font-thin uppercase hover:text-blue-500 dark:text-gray-200`}
                        >
                            <span className="text-left">
                                <svg
                                    width="20"
                                    height="20"
                                    fill="currentColor"
                                    viewBox="0 0 2048 1792"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path d="M1070 1178l306-564h-654l-306 564h654zm722-282q0 182-71 348t-191 286-286 191-348 71-348-71-286-191-191-286-71-348 71-348 191-286 286-191 348-71 348 71 286 191 191 286 71 348z"></path>
                                </svg>
                            </span>
                            <span className="mx-4 text-sm font-normal">Dashboard</span>
                        </Link>
                        <Link
                            className={`${
                                pathName === '/team'
                                    ? 'border-r-4 border-blue-500 bg-gradient-to-r from-white to-blue-100 text-blue-500 '
                                    : 'text-gray-500'
                            } my-2 flex w-full items-center justify-start p-4 font-thin uppercase   hover:text-blue-500 dark:text-gray-200`}
                            href="/team"
                        >
                            <span className="text-left">
                                <svg
                                    width="20"
                                    height="20"
                                    className="m-auto"
                                    fill="currentColor"
                                    viewBox="0 0 2048 1792"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path d="M1070 1178l306-564h-654l-306 564h654zm722-282q0 182-71 348t-191 286-286 191-348 71-348-71-286-191-191-286-71-348 71-348 191-286 286-191 348-71 348 71 286 191 191 286 71 348z"></path>
                                </svg>
                            </span>
                            <span className="mx-4 text-sm font-normal">团队</span>
                        </Link>
                        <Link
                            className={`${
                                pathName === '/project'
                                    ? 'border-r-4 border-blue-500 bg-gradient-to-r from-white to-blue-100 text-blue-500 dark:border-blue-900 dark:bg-gradient-to-r dark:from-black dark:to-blue-500 dark:text-gray-100'
                                    : 'text-gray-500'
                            } my-2 flex w-full items-center justify-start p-4 font-thin uppercase    hover:text-blue-500 dark:text-gray-200`}
                            href="/project"
                        >
                            <span className="text-left">
                                <svg
                                    width="20"
                                    height="20"
                                    fill="currentColor"
                                    className="m-auto"
                                    viewBox="0 0 2048 1792"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path d="M1024 1131q0-64-9-117.5t-29.5-103-60.5-78-97-28.5q-6 4-30 18t-37.5 21.5-35.5 17.5-43 14.5-42 4.5-42-4.5-43-14.5-35.5-17.5-37.5-21.5-30-18q-57 0-97 28.5t-60.5 78-29.5 103-9 117.5 37 106.5 91 42.5h512q54 0 91-42.5t37-106.5zm-157-520q0-94-66.5-160.5t-160.5-66.5-160.5 66.5-66.5 160.5 66.5 160.5 160.5 66.5 160.5-66.5 66.5-160.5zm925 509v-64q0-14-9-23t-23-9h-576q-14 0-23 9t-9 23v64q0 14 9 23t23 9h576q14 0 23-9t9-23zm0-260v-56q0-15-10.5-25.5t-25.5-10.5h-568q-15 0-25.5 10.5t-10.5 25.5v56q0 15 10.5 25.5t25.5 10.5h568q15 0 25.5-10.5t10.5-25.5zm0-252v-64q0-14-9-23t-23-9h-576q-14 0-23 9t-9 23v64q0 14 9 23t23 9h576q14 0 23-9t9-23zm256-320v1216q0 66-47 113t-113 47h-352v-96q0-14-9-23t-23-9h-64q-14 0-23 9t-9 23v96h-768v-96q0-14-9-23t-23-9h-64q-14 0-23 9t-9 23v96h-352q-66 0-113-47t-47-113v-1216q0-66 47-113t113-47h1728q66 0 113 47t47 113z"></path>
                                </svg>
                            </span>
                            <span className="mx-4 text-sm font-normal">项目</span>
                        </Link>
                        <Link
                            className={`${
                                pathName === '/notification'
                                    ? 'border-r-4 border-blue-500 bg-gradient-to-r from-white to-blue-100 text-blue-500 '
                                    : 'text-gray-500'
                            } my-2 flex w-full items-center justify-start p-4 font-thin uppercase hover:text-blue-500 dark:text-gray-200`}
                            href="notification"
                        >
                            <span className="text-left">
                                <svg
                                    width="20"
                                    height="20"
                                    fill="currentColor"
                                    className="m-auto"
                                    viewBox="0 0 2048 1792"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path d="M685 483q16 0 27.5-11.5t11.5-27.5-11.5-27.5-27.5-11.5-27 11.5-11 27.5 11 27.5 27 11.5zm422 0q16 0 27-11.5t11-27.5-11-27.5-27-11.5-27.5 11.5-11.5 27.5 11.5 27.5 27.5 11.5zm-812 184q42 0 72 30t30 72v430q0 43-29.5 73t-72.5 30-73-30-30-73v-430q0-42 30-72t73-30zm1060 19v666q0 46-32 78t-77 32h-75v227q0 43-30 73t-73 30-73-30-30-73v-227h-138v227q0 43-30 73t-73 30q-42 0-72-30t-30-73l-1-227h-74q-46 0-78-32t-32-78v-666h918zm-232-405q107 55 171 153.5t64 215.5h-925q0-117 64-215.5t172-153.5l-71-131q-7-13 5-20 13-6 20 6l72 132q95-42 201-42t201 42l72-132q7-12 20-6 12 7 5 20zm477 488v430q0 43-30 73t-73 30q-42 0-72-30t-30-73v-430q0-43 30-72.5t72-29.5q43 0 73 29.5t30 72.5z"></path>
                                </svg>
                            </span>
                            <span className="mx-4 text-sm font-normal">通知</span>
                        </Link>

                        <Link
                            className={`${
                                pathName === '/personal'
                                    ? 'border-r-4 border-blue-500 bg-gradient-to-r from-white to-blue-100 text-blue-500 '
                                    : 'text-gray-500'
                            } my-2 flex w-full items-center justify-start p-4 font-thin uppercase hover:text-blue-500 dark:text-gray-200`}
                            href="personal"
                        >
                            <span className="text-left">
                                <svg
                                    width="20"
                                    height="20"
                                    fill="currentColor"
                                    className="m-auto"
                                    viewBox="0 0 2048 1792"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path d="M1024 1131q0-64-9-117.5t-29.5-103-60.5-78-97-28.5q-6 4-30 18t-37.5 21.5-35.5 17.5-43 14.5-42 4.5-42-4.5-43-14.5-35.5-17.5-37.5-21.5-30-18q-57 0-97 28.5t-60.5 78-29.5 103-9 117.5 37 106.5 91 42.5h512q54 0 91-42.5t37-106.5zm-157-520q0-94-66.5-160.5t-160.5-66.5-160.5 66.5-66.5 160.5 66.5 160.5 160.5 66.5 160.5-66.5 66.5-160.5zm925 509v-64q0-14-9-23t-23-9h-576q-14 0-23 9t-9 23v64q0 14 9 23t23 9h576q14 0 23-9t9-23zm0-260v-56q0-15-10.5-25.5t-25.5-10.5h-568q-15 0-25.5 10.5t-10.5 25.5v56q0 15 10.5 25.5t25.5 10.5h568q15 0 25.5-10.5t10.5-25.5zm0-252v-64q0-14-9-23t-23-9h-576q-14 0-23 9t-9 23v64q0 14 9 23t23 9h576q14 0 23-9t9-23zm256-320v1216q0 66-47 113t-113 47h-352v-96q0-14-9-23t-23-9h-64q-14 0-23 9t-9 23v96h-768v-96q0-14-9-23t-23-9h-64q-14 0-23 9t-9 23v96h-352q-66 0-113-47t-47-113v-1216q0-66 47-113t113-47h1728q66 0 113 47t47 113z"></path>
                                </svg>
                            </span>
                            <span className="mx-4 text-sm font-normal">个人信息</span>
                        </Link>
                        <Link
                            className={`${
                                pathName === '/setting'
                                    ? 'border-r-4 border-blue-500 bg-gradient-to-r from-white to-blue-100 text-blue-500 '
                                    : 'text-gray-500'
                            } my-2 flex w-full items-center justify-start p-4 font-thin uppercase  hover:text-blue-500 dark:text-gray-200`}
                            href="setting"
                        >
                            <span className="text-left">
                                <svg
                                    width="20"
                                    fill="currentColor"
                                    height="20"
                                    className="h-5 w-5"
                                    viewBox="0 0 1792 1792"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path d="M1088 1256v240q0 16-12 28t-28 12h-240q-16 0-28-12t-12-28v-240q0-16 12-28t28-12h240q16 0 28 12t12 28zm316-600q0 54-15.5 101t-35 76.5-55 59.5-57.5 43.5-61 35.5q-41 23-68.5 65t-27.5 67q0 17-12 32.5t-28 15.5h-240q-15 0-25.5-18.5t-10.5-37.5v-45q0-83 65-156.5t143-108.5q59-27 84-56t25-76q0-42-46.5-74t-107.5-32q-65 0-108 29-35 25-107 115-13 16-31 16-12 0-25-8l-164-125q-13-10-15.5-25t5.5-28q160-266 464-266 80 0 161 31t146 83 106 127.5 41 158.5z"></path>
                                </svg>
                            </span>
                            <span className="mx-4 text-sm font-normal">设置</span>
                        </Link>
                    </div>
                </nav>
            </div>
        </div>
    );
}
