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

const middleware = async (request: NextRequest) => {
  const { cookies } = request;
  const token = cookies.get("token");
  
  return await checkToken(token?.value, request);
}

export const verify = async (token: string): Promise<Payload> => {
  const { payload } = await jwtVerify<Payload>(
    token,
    new TextEncoder().encode(SECRET_KEY)
  );
  return payload;
}

const checkToken = async (token: string | undefined, request: NextRequest) => {
  let response: NextResponse<unknown> = NextResponse.next();

  if (request.nextUrl.pathname.startsWith("/auth/logout")) {
    setOrDeleteCookies(response, null, true)
    response = NextResponse.redirect(new URL("/auth/login", request.url));
  }
  if (!token) {
    if (
      request.nextUrl.pathname.startsWith("/editor") ||
      request.nextUrl.pathname.startsWith("/privateAdmin")
    ) {
      response = NextResponse.redirect(new URL("/auth/login", request.url));
    } else {
      response = NextResponse.next();
    }
    
    setOrDeleteCookies(response, null, true)
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

      setOrDeleteCookies(response, payload, false)
      return response;
    }
    return NextResponse.redirect(new URL("/auth/login", request.url));
  } catch (err) {

    if (request.nextUrl.pathname.startsWith("/auth/login")) {
      response = NextResponse.next();
    } else {
      response = NextResponse.redirect(new URL("/auth/login", request.url));
    }

    setOrDeleteCookies(response, null, true)

    return response;
  }
}

const setOrDeleteCookies = (response: NextResponse, payload : Payload | null,  deleteCookies: boolean) => {
  const cookies = ["email", "role", "pseudo", "id", "token"];

  if (deleteCookies) {
    cookies.forEach(cookie => {
      response.cookies.delete(cookie);
    });
  } else {
    if (payload) {
      cookies.forEach(cookie => {
        if (payload[cookie as keyof Payload] !== undefined) {
          response.cookies.set(cookie, payload[cookie as keyof Payload]);
        }
      });
    }
  }
}

export default middleware;

export const config = {
  matcher: "/:path*",
};
