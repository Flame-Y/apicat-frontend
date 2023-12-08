'use client';

/* Injects */
import { Tree } from 'react-arborist';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { getApiListAPI, createApiAPI, updateApiAPI, deleteApiAPI } from '../api/api/api';
import { listToTree, treeToList } from '@/utils/dataSwitch';
import { ApiItem, TreeNode } from '@/types/type';

export default function SideDirectory() {
    const { data: session }: { data: any } = useSession();
    const token = session?.accessToken;
    const pathName = usePathname();
    const projectId = pathName.split('/')[2];
    const [height, setHeight] = useState(0);
    const [apiList, setApiList] = useState<ApiItem[]>([]);
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(100);
    let [data, setData] = useState<TreeNode[]>([
        {
            _id: '0',
            parentId: '0',
            orderNum: 0,
            name: '根目录',
            isFile: true,
            children: []
        }
    ]);

    /* Effect */
    useEffect(() => {
        const handleResize = () => {
            setHeight(window.innerHeight);
        };
        handleResize();
        window.addEventListener('resize', handleResize);

        // 清除事件监听器
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    useEffect(() => {
        if (token) {
            getApiListAPI(token, projectId, page, pageSize).then((res) => {
                if (res.code === 401) {
                    // token过期
                    return;
                }
                setApiList(res.data.records);
            });
        }
    }, [token, projectId, page, pageSize]);

    useEffect(() => {
        if (apiList) {
            let tree: TreeNode[] = [
                {
                    _id: '0',
                    parentId: '0',
                    orderNum: 0,
                    name: '根目录',
                    isFile: true,
                    children: listToTree(apiList, '0')
                }
            ];
            setData(tree);
        }
    }, [apiList]);

    /* Function */
    //树形结构转扁平化数据
    const tree2list = (tree: TreeNode[]) => {
        const list = treeToList(tree);
        list.shift();
        console.log(list);
    };

    //递归查找节点函数
    const findNode = (node: TreeNode, _id: string): TreeNode | undefined => {
        if (node._id === _id) {
            return node;
        }
        if (node.children) {
            for (let i = 0; i < node.children.length; i++) {
                const result = findNode(node.children[i], _id);
                if (result) {
                    return result;
                }
            }
        }
    };

    /**
     * 新建节点函数
     * @param node - 新建节点的父节点
     * @returns {void}
     */
    const onCreate = (node: any) => {
        console.log(node);
        //寻找node的children中最大的orderNum
        let maxOrderNum = 0;
        if (node.children) {
            node.children.forEach((item) => {
                if (item.data.orderNum > maxOrderNum) {
                    maxOrderNum = item.data.orderNum;
                }
            });
        }
        console.log(maxOrderNum);

        // 创建新节点
        createApiAPI(token, {
            name: '新建接口',
            description: '新建接口',
            method: 'GET',
            url: '',
            orderNum: maxOrderNum + 1,
            pid: projectId,
            parentId: node.data._id
        }).then((res) => {
            console.log(res);

            if (res.code === 401) {
                // token过期
                return;
            }
            if (res.code === 200) {
                getApiListAPI(token, projectId, page, pageSize).then((res) => {
                    if (res.code === 401) {
                        // token过期
                        return;
                    }
                    setApiList(res.data.records);
                });
            }
        });
    };

    /**
     * 重命名节点函数
     * @param {string}
     * @returns {void}
     */
    const onRename = ({ id, name }) => {};

    /**
     * 拖拽节点函数
     * @param {string[]} dragIds - 拖拽的节点id
     * @param {string} parentId - 目标父节点id
     * @param {number} index - 目标父节点的children中的位置
     * @returns {void}
     */
    const onMove = ({ dragIds, dragNodes, parentId, index }: any): void => {
        // console.log(dragIds, dragNodes, parentId, index);
        // console.log(dragNodes[0].rowIndex, index);
        if (dragNodes[0].rowIndex - 1 === index || dragNodes[0].rowIndex === index) return;
        setData((data) => {
            let newData = [...data];
            const dragNode = findNode(newData[0], dragIds[0]);
            const parentNode = findNode(newData[0], parentId);
            if (dragNode && parentNode) {
                //若目标父节点不变，则修改目标父节点的children顺序
                if (parentNode.children?.includes(dragNode)) {
                    //获取拖拽节点在目标父节点children中的位置
                    const dragIndex = parentNode.children.indexOf(dragNode);
                    console.log(dragIndex, index);

                    //若拖拽节点在目标父节点children中的位置不变，则不做任何操作
                    if (dragIndex === index) {
                        return newData;
                    }
                    //若拖拽节点在目标父节点children中的位置改变，则修改目标父节点的children顺序
                    const newChildren = [...parentNode.children];
                    newChildren.splice(dragIndex, 1);
                    //若拖拽节点在目标父节点children中的位置在目标位置之前，则目标位置的索引减一
                    if (dragIndex < index) {
                        newChildren.splice(index - 1, 0, dragNode);
                    } else {
                        newChildren.splice(index, 0, dragNode);
                    }
                    parentNode.children = newChildren;
                }
                //若目标父节点改变，则修改拖拽节点的父节点
                else {
                    const newChildren = [...parentNode.children];
                    newChildren.splice(index, 0, dragNode);
                    parentNode.children = newChildren;
                    //删除拖拽节点在原父节点的children中的位置
                    const dragParentNode = dragNodes[0].parent.data;
                    if (dragParentNode && dragParentNode.children) {
                        const dragIndex = dragParentNode.children.indexOf(dragNode);
                        const newChildren = [...dragParentNode.children];
                        newChildren.splice(dragIndex, 1);
                        dragParentNode.children = newChildren;
                    }
                }
            }

            return newData;
        });
    };

    /**
     * 删除节点函数
     */
    const onDelete = (node: any) => {
        console.log(node);
        deleteApiAPI(token, projectId, node.data._id).then((res) => {
            if (res.code === 401) {
                // token过期
                return;
            }
            if (res.code === 200) {
                getApiListAPI(token, projectId, page, pageSize).then((res) => {
                    if (res.code === 401) {
                        // token过期
                        return;
                    }
                    setApiList(res.data.records);
                });
            }
        });
    };

    return (
        <div className="h-screen w-1/3 bg-purple-50 dark:bg-slate-800 ">
            <Tree
                data={data}
                idAccessor="_id"
                onCreate={onCreate}
                onRename={onRename}
                onMove={onMove}
                onDelete={onDelete}
                width={'100%'}
                height={height}
                openByDefault={true}
                indent={24}
                rowHeight={36}
                overscanCount={1}
                padding={25}
                className="h-screen  rounded-sm scrollbar scrollbar-track-slate-300 scrollbar-thumb-slate-700 scrollbar-track-rounded-full scrollbar-thumb-rounded-full  hover:scrollbar-thumb-slate-900 lg:block"
            >
                {Node as any}
            </Tree>
        </div>
    );
    function Node({ node, style, dragHandle }: { node: any; style: any; dragHandle: any }) {
        return (
            <>
                {node.data.isFile === true ? (
                    <div
                        className="group flex h-9 cursor-pointer  items-center  justify-between rounded border-gray-700 text-sm text-gray-600 hover:bg-purple-100 dark:text-white dark:hover:bg-slate-500"
                        ref={dragHandle}
                        onClick={() => node.toggle()}
                        style={style}
                    >
                        <div className="ml-3">
                            {node.data.isFile === true ? <span className="mr-3">🗀</span> : ''}
                            {node.data.name}
                        </div>
                        <div className="mr-3 flex gap-0.5 ">
                            <div
                                className="invisible rounded p-0.5 group-hover:visible hover:bg-neutral-200 dark:hover:bg-slate-600"
                                onClick={(e) => {
                                    e.preventDefault();
                                    e.stopPropagation();
                                    onCreate(node);
                                }}
                            >
                                <svg
                                    width="16"
                                    height="16"
                                    viewBox="0 0 48 48"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M24.0605 10L24.0239 38"
                                        stroke="currentColor"
                                        strokeWidth="4"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                    <path
                                        d="M10 24L38 24"
                                        stroke="currentColor"
                                        strokeWidth="4"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                </svg>
                            </div>

                            <div
                                className="invisible rounded p-0.5 group-hover:visible hover:bg-neutral-200 dark:hover:bg-slate-600"
                                onClick={(e) => {
                                    e.preventDefault();
                                    e.stopPropagation();
                                    onDelete(node);
                                }}
                            >
                                {/* <svg
                                    width="16"
                                    height="16"
                                    viewBox="0 0 48 48"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <circle cx="12" cy="24" r="3" fill="currentColor" />
                                    <circle cx="24" cy="24" r="3" fill="currentColor" />
                                    <circle cx="36" cy="24" r="3" fill="currentColor" />
                                </svg> */}
                                <svg
                                    width="16"
                                    height="16"
                                    viewBox="0 0 48 44"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M14 11L4 24L14 37H44V11H14Z"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="4"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                    <path
                                        d="M21 19L31 29"
                                        stroke="currentColor"
                                        strokeWidth="4"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                    <path
                                        d="M31 19L21 29"
                                        stroke="currentColor"
                                        strokeWidth="4"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                </svg>
                            </div>
                        </div>
                    </div>
                ) : (
                    <Link
                        className="group flex h-9 cursor-pointer items-center rounded  border-gray-700  text-sm text-gray-600 hover:bg-purple-100 dark:text-white dark:hover:bg-slate-500 "
                        ref={dragHandle}
                        onClick={() => node.toggle()}
                        style={style}
                        href={`/project/${projectId}/${node.data._id}`}
                    >
                        <div className="flex w-full justify-between">
                            <div className={`ml-3`}>
                                {node.data.method === 'GET' ? (
                                    <span className="mr-3 font-bold text-blue-500">GET</span>
                                ) : (
                                    ''
                                )}
                                {node.data.method === 'POST' ? (
                                    <span className="mr-3 font-bold text-green-500">POST</span>
                                ) : (
                                    ''
                                )}
                                {node.data.method === 'DELETE' ? (
                                    <span className="mr-3 font-bold text-red-500">DELETE</span>
                                ) : (
                                    ''
                                )}
                                {node.data.method === 'PUT' ? (
                                    <span className="mr-3 font-bold text-yellow-500">PUT</span>
                                ) : (
                                    ''
                                )}
                                {node.data.name}
                            </div>
                            <div className="mr-3 flex gap-0.5">
                                <div
                                    className="invisible  rounded p-0.5 group-hover:visible hover:bg-neutral-200 dark:hover:bg-slate-600"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        // onDelete(node);
                                    }}
                                >
                                    <svg
                                        width="16"
                                        height="16"
                                        viewBox="0 0 48 48"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <circle cx="12" cy="24" r="3" fill="currentColor" />
                                        <circle cx="24" cy="24" r="3" fill="currentColor" />
                                        <circle cx="36" cy="24" r="3" fill="currentColor" />
                                    </svg>
                                </div>
                            </div>
                        </div>
                    </Link>
                )}
            </>
        );
    }
}
