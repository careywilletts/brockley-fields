import { NextResponse, type NextRequest } from 'next/server'

// Pages that stay reachable while the holding page is switched on.
const OPEN_PATHS = ['/holding', '/waiting-list']

// Tolerant of stray quotes, spacing or trailing notes pasted into the env var value.
function holdingPageEnabled() {
  const value = (process.env.HOLDING_PAGE ?? '').trim().replace(/^["']/, '').toLowerCase()
  return /^(on|true|yes|1)\b/.test(value)
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
