async function LoginAPI({ email, password }: { email: string; password: string }): Promise<any> {
    const res = await fetch(`http://localhost:3000/user/login`, {
        method: 'POST',
        body: JSON.stringify({ email, password }),
        headers: {
            'Content-Type': 'application/json'
        }
    });
    const data = await res.json();

    return data;
}

async function ResisterAPI({ email, password }: { email: string; password: string }) {
    const res = await fetch(`http://localhost:3000/user/register`, {
        method: 'POST',
        body: JSON.stringify({ email, password }),
        headers: {
            'Content-Type': 'application/json'
        }
    });
    const data = await res.json();

    return data;
}

async function CheckEmailAPI(email: string) {
    const res = await fetch(`http://localhost:3000/user/checkEmail`, {
        method: 'POST',
        body: JSON.stringify({ email }),
        headers: {
            'Content-Type': 'application/json'
        }
    });
    const data = await res.json();

    return data;
}

async function CheckGithubAPI(githubId: string) {
    const res = await fetch(`http://localhost:3000/user/checkGithub`, {
        method: 'POST',
        body: JSON.stringify({ githubId }),
        headers: {
            'Content-Type': 'application/json'
        }
    });
    const data = await res.json();

    return data;
}

async function GithubLoginAPI(githubId: string) {
    const res = await fetch(`http://localhost:3000/user/loginByGithub`, {
        method: 'POST',
        body: JSON.stringify({ githubId }),
        headers: {
            'Content-Type': 'application/json'
        }
    });
    const data = await res.json();

    return data;
}

async function GithubRegisterAPI(user: any) {
    const res = await fetch(`http://localhost:3000/user/registerByGithub`, {
        method: 'POST',
        body: JSON.stringify(user),
        headers: {
            'Content-Type': 'application/json'
        }
    });
    const data = await res.json();

    return data;
}
export { LoginAPI, ResisterAPI, CheckEmailAPI, CheckGithubAPI, GithubLoginAPI, GithubRegisterAPI };
