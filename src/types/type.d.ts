type ProjectItem = {
    id: string;
    name: string;
    avatar: string;
    description: string;
    createTime: string;
    updateTime: string;
    apiCount: number;
    type: number;
    teamId?: string;
    permission: string;
};
type ApiItem = {
    _id: string;
    name: string;
    description: string;
    method: string;
    path: string;
    orderNum: number;
    teamId: string;
    projectId: string;
    createTime: string;
    updateTime: string;
    status: number;
    type: number;
    isFile: boolean;
    parentId: string;
    children?: ApiItem[] | null;
};

type TreeNode = {
    _id: string;
    parentId: string;
    name: string;
    orderNum: number;
    method?: string;
    isFile?: boolean;
    children?: TreeNode[] | null;
};

export type { ProjectItem, ApiItem, TreeNode };
