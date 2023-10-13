async function LoginAPI({ username, password }: { username: string; password: string }): Promise<any> {
    const res = await fetch(`http://localhost:3000/user/login`, {
        method: 'POST',
        body: JSON.stringify({ username, password }),
        headers: {
            'Content-Type': 'application/json'
        }
    });
    const data = await res.json();

    return data;
}

export default LoginAPI;

async function ResisterAPI(request: Request) {
    const res = await fetch(`http://localhost:3000/user/register`, {
        method: 'POST',
        body: JSON.stringify(request),
        headers: {
            'Content-Type': 'application/json'
        }
    });
    const data = await res.json();

    return data;
}
