import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";

interface Payload {
  email: string;
  role: string;
  pseudo: string;
  id: string;
}

const SECRET_KEY = process.env.SECRET_KEY || "";

export default async function middleware(request: NextRequest) {
  const { cookies } = request;
  const token = cookies.get("token");
  
  return await checkToken(token?.value, request);
}

export async function verify(token: string): Promise<Payload> {
  const { payload } = await jwtVerify<Payload>(
    token,
    new TextEncoder().encode(SECRET_KEY)
  );
  return payload;
}

async function checkToken(token: string | undefined, request: NextRequest) {
  let response: NextResponse<unknown> = NextResponse.next();
  console.log("checktoken", token)
  if (request.nextUrl.pathname.startsWith("/auth/logout")) {
    response.cookies.delete("email");
    response.cookies.delete("role");
    response.cookies.delete("pseudo");
    response.cookies.delete("id");
    response = NextResponse.redirect(new URL("/auth/login", request.url));
  }
  if (!token) {
    if (
      request.nextUrl.pathname.startsWith("/private") ||
      request.nextUrl.pathname.startsWith("/privateAdmin")
    ) {
      response = NextResponse.redirect(new URL("/auth/login", request.url));
    } else {
      response = NextResponse.next();
    }
    
    response.cookies.delete("email");
    response.cookies.delete("role");
    response.cookies.delete("pseudo");
    response.cookies.delete("id");
    return response;
  }
  
  try {
    const payload = await verify(token);
    if (payload.email && payload.role) {
      response = NextResponse.next();
     if (
      request.nextUrl.pathname.startsWith("/auth/login") ||
      request.nextUrl.pathname.startsWith("/auth/register")
      ) {
      response = NextResponse.redirect(new URL("/", request.url));
    } else if (
        request.nextUrl.pathname.startsWith("/privateAdmin") &&
        payload.role !== "ADMIN"
      ) {
        response = NextResponse.redirect(new URL("/400", request.url));
      }

      response.cookies.set("email", payload.email);
      response.cookies.set("role", payload.role);
      response.cookies.set("pseudo", payload.pseudo);
      response.cookies.set("id", payload.id);

      return response;
    }
    return NextResponse.redirect(new URL("/auth/login", request.url));
  } catch (err) {
    console.error("Verification failed", err);
    return NextResponse.redirect(new URL("/auth/login", request.url));
  }
}

export const config = {
  matcher: "/:path*",
};
