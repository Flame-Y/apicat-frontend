async function GetInfoAPI(token: string): Promise<any> {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/user/info`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        }
    });
    const data = await res.json();
    return data;
}
export { GetInfoAPI };
