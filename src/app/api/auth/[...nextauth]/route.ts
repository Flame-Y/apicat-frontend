import NextAuth from 'next-auth';
import { getServerSession } from 'next-auth/next';
import GithubProvider from 'next-auth/providers/github';
import type { NextAuthOptions } from 'next-auth';

export const authOptions: NextAuthOptions = {
    providers: [
        GithubProvider({
            clientId: process.env.GITHUB_ID,
            clientSecret: process.env.GITHUB_SECRET,
            httpOptions: {
                timeout: 50000
            }
        })
    ],
    callbacks: {
        session: async ({ session, token }) => {
            return token;
        }
    }
};

//处理HTTP请求判断是否登录
const handler = async (req, res) => {
    const session = await getServerSession(req, res, authOptions);

    if (!session) {
        res.status(401).json({ message: 'You must be logged in.' });
        return;
    }
    return res.json({
        message: 'Success'
    });
};

export { handler as GET, handler as POST };
