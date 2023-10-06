import NextAuth from 'next-auth';
import { authOptions } from '@/app/options';

//处理HTTP请求判断是否登录
const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
