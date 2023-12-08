async function getApiListAPI(token: string, pid: string, page: number, size: number) {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/getProjectApiList/${pid}/${page}/${size}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        }
    });
    const data = await res.json();
    return data;
}

async function createApiAPI(
    token: string,
    {
        name,
        description,
        method,
        url,
        pid,
        parentId,
        orderNum
    }: {
        name: string;
        description: string;
        method: string;
        url: string;
        pid: string;
        parentId: string;
        orderNum: number;
    }
) {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/create`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ name, description, method, url, pid, parentId, orderNum })
    });
    const data = await res.json();
    return data;
}

async function updateApiAPI(
    token: string,
    {
        id,
        name,
        description,
        method,
        url,
        pid,
        parentId,
        orderNum
    }: {
        id: string;
        name: string;
        description: string;
        method: string;
        url: string;
        pid: string;
        parentId: string;
        orderNum: number;
    }
) {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/update/${pid}/${id}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ name, description, method, url, parentId, orderNum })
    });
    const data = await res.json();
    return data;
}

async function deleteApiAPI(token: string, pid: string, id: string) {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/deleteApi/${pid}/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        }
    });
    const data = await res.json();
    return data;
}

async function getApiDetailAPI(token: string, pid: string, id: string) {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/getApiDetail/${pid}/${id}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        }
    });
    const data = await res.json();
    return data;
}

export { getApiListAPI, createApiAPI, updateApiAPI, deleteApiAPI, getApiDetailAPI };
