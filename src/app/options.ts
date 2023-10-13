import GithubProvider from 'next-auth/providers/github';
import CredentialsProvider from 'next-auth/providers/credentials';
import type { NextAuthOptions } from 'next-auth';
import LoginAPI from '@/app/(auth)/api';
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
                username: { label: 'Username', type: 'text', placeholder: 'jsmith' },
                password: { label: 'Password', type: 'password' }
            },
            async authorize(credentials, req) {
                if (typeof credentials !== 'undefined') {
                    // 认证邮件和密码是否正确
                    const res = await LoginAPI({ username: credentials.username, password: credentials.password });
                    // console.log('res', res);
                    if (res.code === 201) {
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
        async session({ session, token, user }: { session: any; token: any; user: any }) {
            session.accessToken = token.accessToken;
            session.user.id = token.id;
            session.user.name = token.name;
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
