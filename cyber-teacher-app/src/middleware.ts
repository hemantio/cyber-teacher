import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
    // SAFETY KILL SWITCH
    // Set NEXT_PUBLIC_KILL_SWITCH=true in Vercel Environment Variables to instantly disable the site
    const isKillSwitchActive = process.env.NEXT_PUBLIC_KILL_SWITCH === 'true';
    const isMaintenancePage = request.nextUrl.pathname === '/maintenance';

    // If kill switch is active, redirect EVERYTHING to /maintenance (except assets/api if needed, but for billing safety, block all)
    // We allow specific asset paths to ensure the maintenance page can render (if it uses assets), but simplest is to block all.
    if (isKillSwitchActive) {
        if (!isMaintenancePage && !request.nextUrl.pathname.startsWith('/_next')) {
            return NextResponse.rewrite(new URL('/maintenance', request.url));
        }
    }

    // If kill switch is NOT active, but user tries to visit maintenance, redirect to home
    if (!isKillSwitchActive && isMaintenancePage) {
        return NextResponse.redirect(new URL('/', request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - api (API routes)
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         */
        '/((?!api|_next/static|_next/image|favicon.ico).*)',
    ],
};
