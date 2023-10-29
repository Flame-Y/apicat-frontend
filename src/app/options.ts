import GithubProvider from 'next-auth/providers/github';
import CredentialsProvider from 'next-auth/providers/credentials';
import type { NextAuthOptions } from 'next-auth';
import { LoginAPI, CheckGithubAPI, GithubLoginAPI, GithubRegisterAPI } from '@/app/api/auth/api';

export const authOptions: NextAuthOptions = {
    providers: [
        GithubProvider({
            clientId: process.env.GITHUB_ID || '',
            clientSecret: process.env.GITHUB_SECRET || '',
            httpOptions: {
                timeout: 50000
            }
        }),
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                email: { label: 'Email', type: 'text' },
                password: { label: 'Password', type: 'password' }
            },
            async authorize(credentials, req) {
                if (typeof credentials !== 'undefined') {
                    // 认证邮件和密码是否正确
                    const res = await LoginAPI({ email: credentials.email, password: credentials.password });
                    // console.log('res', res);
                    if (res.code === 200) {
                        if (typeof res !== 'undefined') {
                            return { ...res.data.userInfo, accessToken: res.data.accessToken };
                        } else {
                            return null;
                        }
                    } else {
                        return null;
                    }
                }
            }
        })
    ],
    session: {
        strategy: 'jwt'
    },
    callbacks: {
        async session({ session, token }: { session: any; token: any }) {
            // console.log('session', session);
            // console.log('token', token);
            session.accessToken = token.accessToken;
            session.user.id = token.id;
            session.user.name = token.name;
            if (token.id && !token.accessToken) {
                const res = await CheckGithubAPI(token.id);
                console.log('res', res);
                if (res.code === 200) {
                    if (res.data) {
                        const githubLogin = await GithubLoginAPI(token.id);
                        session.user.id = githubLogin.data.userInfo.id;
                        session.user.name = githubLogin.data.userInfo.username;
                        session.accessToken = githubLogin.data.accessToken;
                        // console.log('githubLogin', githubLogin);
                    } else {
                        const user = {
                            githubId: token.id,
                            email: token.email,
                            username: token.name,
                            avatar: token.picture,
                            password: token.email
                        };
                        const githubResister = await GithubRegisterAPI(user);
                        // console.log('githubResister', githubResister);
                    }
                }
            }
            return session;
        },
        async jwt({ token, user }: { token: any; user: any }) {
            if (user) {
                token.accessToken = user.accessToken;
                token.id = user.id;
                token.name = user.username || user.name;
            }
            return token;
        }
    }
};
