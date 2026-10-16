import { NextResponse, type NextRequest } from 'next/server'

// Pages that stay reachable while the holding page is switched on.
const OPEN_PATHS = ['/holding', '/waiting-list']

export function proxy(request: NextRequest) {
  if (process.env.HOLDING_PAGE !== 'on') return NextResponse.next()

  const { pathname } = request.nextUrl
  if (OPEN_PATHS.some((path) => pathname === path || pathname.startsWith(`${path}/`))) {
    return NextResponse.next()
  }

  const url = request.nextUrl.clone()
  url.pathname = '/holding'
  url.search = ''
  return NextResponse.rewrite(url)
}

export const config = {
  // Skip Next internals and any static file (anything with an extension).
  matcher: ['/((?!_next/|api/|.*\\..*).*)'],
}
