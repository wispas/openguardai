import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
export function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;
  
    // 🚀 If someone goes to /login or /register → send to /
    if (pathname === "/login" || pathname === "/register") {
      return NextResponse.redirect(new URL("/", request.url));
    }
  
    return NextResponse.next();
  }

// export function middleware(request: NextRequest) {
//   const token = request.cookies.get("token");

//   const isAuthPage =
//     request.nextUrl.pathname.startsWith("/login") ||
//     request.nextUrl.pathname.startsWith("/register");

//   // If not logged in and trying to access protected page
//   if (!token && !isAuthPage) {
//     return NextResponse.redirect(new URL("/login", request.url));
//   }

//   // If logged in and trying to access login/register
//   if (token && isAuthPage) {
//     return NextResponse.redirect(new URL("/", request.url));
//   }

//   return NextResponse.next();
// }

export const config = {
  matcher: ["/((?!_next|favicon.ico).*)"],
};
