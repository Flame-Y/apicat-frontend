import { TreeNode } from '@/types/type';

/**
 * 平铺list转树形（深度优先，先纵向再横向）
 * @param {*} list 平铺list
 * @param {*} parentId 父节点id
 * @returns 树形数据
 */
function listToTree(list: TreeNode[], parentId: string): TreeNode[] | null {
    const tree: TreeNode[] = list.filter((item) => item.parentId === parentId);
    if (!tree || tree.length <= 0) return null;
    //按orderNum排序
    tree.sort((a, b) => a.orderNum - b.orderNum);
    tree.forEach((item) => {
        const res = listToTree(list, item._id);
        if (res) {
            item.children = res;
        }
    });
    return tree;
}

/**
 * 树形转平铺list（广度优先，先横向再纵向）
 * @param {*} tree 树形数据
 * @returns 扁平化后的数据
 */
function treeToList(tree: TreeNode[]): TreeNode[] {
    const list: TreeNode[] = [];
    for (let i = 0; i < tree.length; i++) {
        const { children, ...rest } = tree[i];
        //重置orderNum
        rest.orderNum = i + 1;
        list.push(rest);
        if (children) {
            list.push(...treeToList(children));
        }
    }
    return list;
}

export { listToTree, treeToList };
