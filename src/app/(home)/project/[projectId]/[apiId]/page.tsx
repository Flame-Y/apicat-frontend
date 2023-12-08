'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { getApiDetailAPI } from '@/app/api/api/api';

export default function Page({ params }: { params: { projectId: string; apiId: string } }) {
    const { data: session }: { data: any } = useSession();
    const token = session?.accessToken;
    const projectId = params.projectId;
    const apiId = params.apiId;
    const [apiName, setApiName] = useState('');
    const [apiDescription, setApiDescription] = useState('');
    const [apiUrl, setApiUrl] = useState('');
    const [apiType, setApiType] = useState('');
    const [apiTypeColor, setApiTypeColor] = useState('');
    const [apiUrlColor, setApiUrlColor] = useState('');
    const [apiParams, setApiParams] = useState([]);
    const [apiResponse, setApiResponse] = useState([]);

    useEffect(() => {
        if (token) {
            getApiDetailAPI(token, projectId, apiId).then((res) => {
                setApiName(res.data.name);
                setApiDescription(res.data.description);
                setApiUrl(res.data.url);
                setApiType(res.data.method);
                if (res.data.method === 'GET') {
                    setApiTypeColor('#61affe');
                    setApiUrlColor('#ebf3fb');
                } else if (res.data.method === 'POST') {
                    setApiTypeColor('#49cc90');
                    setApiUrlColor('#e8f6f0');
                } else if (res.data.method === 'DELETE') {
                    setApiTypeColor('#f93e3e');
                    setApiUrlColor('#fae7e7');
                } else {
                    setApiTypeColor('#73768f');
                    setApiUrlColor('#dde1ff');
                }
            });
        }
    }, [token, projectId, apiId]);
    return (
        <div className="flex h-full flex-col items-start justify-between gap-2 rounded-lg bg-gray-200 p-6">
            <div className="flex h-12 items-center gap-2 p-2">
                <div className="api-detail-top-back">
                    <Link href={`/project/${projectId}`}>
                        <svg width="36" height="36" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M5.79889 24H41.7989"
                                stroke="currentColor"
                                strokeWidth="4"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                            <path
                                d="M17.7988 36L5.79883 24L17.7988 12"
                                stroke="currentColor"
                                strokeWidth="4"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg>
                    </Link>
                </div>
                <div className="h-8 text-center align-middle text-2xl font-bold text-black">{projectId}</div>
                <div className="h-8 w-3 text-center align-middle text-2xl font-normal text-gray-500">/</div>
                <div className="h-8 text-center align-middle text-2xl font-bold text-black">接口详情</div>
                <div className="h-8 w-3 text-center align-middle text-2xl font-normal text-gray-500">/</div>
                <div className="h-8 text-center align-middle text-2xl font-normal text-gray-500">{apiName}</div>
            </div>
            <div>接口描述：{apiDescription}</div>
            <div
                className="mb-4 flex w-full items-center justify-between rounded border border-solid p-1 shadow-md"
                style={{ backgroundColor: apiUrlColor, borderColor: apiTypeColor }}
            >
                <div className="flex items-center gap-2">
                    <div
                        className="min-w-20 text-shadow rounded p-2 text-center font-sans text-lg font-bold text-white"
                        style={{ backgroundColor: apiTypeColor }}
                    >
                        {apiType}
                    </div>
                    <div className="flex items-center break-words font-mono text-lg font-semibold text-gray-800">
                        {apiUrl}
                    </div>
                </div>
                <button
                    className="min-w-20 text-shadow min-w-30 text-shadow flex cursor-pointer items-center justify-center rounded p-2  text-center font-sans text-lg font-bold text-white  transition-all  hover:opacity-50"
                    style={{ backgroundColor: apiTypeColor }}
                >
                    运行接口
                </button>
            </div>
        </div>
    );
}
