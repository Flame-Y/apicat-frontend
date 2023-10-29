async function GetTeamListAPI(token: string): Promise<any> {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/team/getUserTeamList`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        }
    });
    const data = await res.json();
    return data;
}

async function GetTeamDetailAPI(token: string, teamId: string): Promise<any> {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/team/getTeamDetail/${teamId}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        }
    });
    const data = await res.json();
    return data;
}

async function CreateTeamAPI(token: string, teamName: string): Promise<any> {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/team/createTeam`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ teamName })
    });
    const data = await res.json();
    return data;
}

export { GetTeamListAPI };
