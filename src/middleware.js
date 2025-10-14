import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { decrypt } from "@/app/lib/session";

const protectedRoutes = ["/admin"];
const loginRoutes = ["/admin/login"];

export default async function middleware(req) {
  const path = req.nextUrl.pathname;
  const isProtectedRoute = protectedRoutes.startWith(path);
  const isLoginRoute = loginRoutes.includes(path);

  const cookie = (await cookies()).get("session")?.value;
  const session = await decrypt(cookie);

  // Redirect to /login if the user is not authenticated
  if (isProtectedRoute && !isLoginRoute && !session?.adminUser) {
    return NextResponse.redirect(new URL("/admin/login", req.nextUrl));
  }

  //Redirect to /admin if the user is authenticated
  if (isLoginRoute && session?.adminUser) {
    return NextResponse.redirect(new URL("/admin", req.nextUrl));
  }

  return NextResponse.next();
}
