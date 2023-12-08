async function getProjectListAPI(token: string) {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/project/getUserProjectList`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        }
    });
    const data = await res.json();
    return data;
}

export { getProjectListAPI };
