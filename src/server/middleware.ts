import { type NextRequest, NextResponse } from "next/server";
import { headers } from "next/headers";
import { auth } from "~/lib/auth";
 
export async function middleware(request: NextRequest) {
    const session = await auth.api.getSession({
        headers: await headers()
    })
 
    if(!session) {
        return NextResponse.redirect(new URL("/signin", request.url));
        
    }

    console.log("session", session)
    return NextResponse.next();
}
 
export const config = {
  runtime: "nodejs",
  matcher: ["/"], // Apply middleware to specific routes
};