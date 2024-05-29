import { NextRequest, NextResponse } from "next/server";

// Middleware runs on Server before Request is processed by rest of the Server
// Middleware can be used for Authentication, Logging, etc.
export function middleware(request: NextRequest) {
  //   return NextResponse.next(); // Continue to the next Middleware or rest of the Server
  return NextResponse.redirect(new URL("/events/all", request.url));
}

export const config = {
  matcher: ["/events"],
};
