import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

//todo: 增加无需登录的白名单
export async function middleware(req: NextRequest) {
    const nextUrl = req.nextUrl;
    if (nextUrl.pathname !== '/login' && nextUrl.pathname !== '/register') {
        const nextCookie = req.cookies.get('next-auth.session-token');
        if (!nextCookie || !nextCookie.value) {
            return NextResponse.redirect(new URL('/login', req.url));
        }
    }
}
export const config = {
    matcher: [
        // 不匹配静态资源与api
        '/((?!api|_next/static|_next/image|images|favicon.ico).*)'
    ]
};
