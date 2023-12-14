import { getToken } from 'next-auth/jwt'
import { NextRequest, NextResponse } from 'next/server'

export async function middleware(request: NextRequest) {
    const path = request.nextUrl.pathname
    // const publicPath = path === '/' || path === '/authorization'
    const publicPath = path === '/authenticate' || path === '/'
    //   const token = request.cookies.get('token')?.value || ''
    const token = await getToken({ req: request, secret: process.env.NEXTAUTH_SECRET })
    if (publicPath && token)
        return NextResponse.redirect(new URL('/home', request.nextUrl))
    if (!publicPath && !token)
        return NextResponse.redirect(new URL('/authenticate', request.nextUrl))
}

export const config = {
    matcher: ['/', '/home' ,'/home/:id*', '/authenticate']
}