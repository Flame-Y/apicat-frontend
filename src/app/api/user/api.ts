async function GetInfoAPI(token: string): Promise<any> {
    const res = await fetch(`http://localhost:3000/user/info`, {
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
