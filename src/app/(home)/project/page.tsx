'use client';

/* Injects */
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { getProjectListAPI } from '@/app/api/project/api';
import Card from '@/app/components/ProjectCard';
import { ProjectItem } from '../../../types/type';

export default function Project() {
    const { data: session }: { data: any } = useSession();
    const token = session?.accessToken;

    const [projectList, setProjectList] = useState<ProjectItem[]>([]);
    useEffect(() => {
        if (token) {
            getProjectListAPI(token).then((res) => {
                console.log(res);
                if (res.code === 401) {
                    // token过期
                    return;
                }
                setProjectList(res.data.records);
            });
        }
    }, [token]);
    return (
        <div className="h-screen px-5 pt-5">
            <div className="peer grid grid-cols-2 gap-8 min-[1440px]:grid-cols-3 min-[1780px]:grid-cols-4">
                {projectList.map((item: ProjectItem) => (
                    <Link href={`/project/${item.id}`} key={item.id}>
                        <Card
                            name={item.name}
                            description={item.description}
                            id={item.id}
                            apiCount={item.apiCount}
                            avatar={item.avatar}
                            type={item.type}
                            createTime={item.createTime}
                            updateTime={item.updateTime}
                            permission={item.permission}
                        />
                    </Link>
                ))}
            </div>
        </div>
    );
}
