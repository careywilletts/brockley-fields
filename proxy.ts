import { NextResponse, type NextRequest } from 'next/server'

// Pages that stay reachable while the holding page is switched on.
const OPEN_PATHS = ['/holding', '/waiting-list', '/privacy']

// Any value switches the holding page on (the env form is easy to mis-fill);
// only an explicit off/false/no/0, or deleting the variable, turns it off.
function holdingPageEnabled() {
  const value = (process.env.HOLDING_PAGE ?? '').trim().replace(/^["']|["']$/g, '').toLowerCase()
  if (!value) return false
  return !/^(off|false|no|0)$/.test(value)
}

export function proxy(request: NextRequest) {
  if (!holdingPageEnabled()) return NextResponse.next()

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
