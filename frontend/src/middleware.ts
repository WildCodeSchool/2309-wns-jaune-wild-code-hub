import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";

interface Payload {
  email: string;
  role: string;
}

// const SECRET_KEY = process.env.SECRET_KEY || "";

export default async function middleware(request: NextRequest) {
  const { cookies } = request;
  const token = cookies.get("token");
  
  return await checkToken(token?.value, request);
}

export async function verify(token: string): Promise<Payload> {
  const { payload } = await jwtVerify<Payload>(
    token,
    new TextEncoder().encode(process.env.SECRET_KEY || "")
  );
  return payload;
}

async function checkToken(token: string | undefined, request: NextRequest) {
  let response: NextResponse<unknown> = NextResponse.next();
  console.log("checktoken", token)
  if (request.nextUrl.pathname.startsWith("/auth/logout")) {
    response.cookies.delete("email");
    response.cookies.delete("role");
    console.log("je suis déconnecté")
    response = NextResponse.redirect(new URL("/auth/login", request.url));
  }
console.log("avant !token")
  if (!token) {
    console.log("toto")
    if (
      request.nextUrl.pathname.startsWith("/private") ||
      request.nextUrl.pathname.startsWith("/privateAdmin")
    ) {
      console.log("admin book c sxs")
      console.log("request.nextUrl.pathname", request.nextUrl.pathname)
      response = NextResponse.redirect(new URL("/auth/login", request.url));
    } else {
      response = NextResponse.next();
    }
    
    response.cookies.delete("email");
    response.cookies.delete("role");
    return response;
  }
  
  try {
    const payload = await verify(token);
    console.log(payload)
    if (payload.email && payload.role) {
      response = NextResponse.next();
      //vérifier si la route commence par admin, et que le payload.role n'est pas admin, je redirige
      if (
        request.nextUrl.pathname.startsWith("/privateAdmin") &&
        payload.role !== "ADMIN"
      ) {
        response = NextResponse.redirect(new URL("/400", request.url));
      }

      response.cookies.set("email", payload.email);
      response.cookies.set("role", payload.role);

      return response;
    }
    return NextResponse.redirect(new URL("/auth/login", request.url));
  } catch (err) {
    console.error("Verification failed", err);
    return NextResponse.redirect(new URL("/auth/login", request.url));
  }
}

// export const config = {
//   matcher: "/books/list/:path*",
// };
export const config = {
  matcher: "/:path*",
};







// import { NextResponse, NextRequest } from "next/server";
// import { jwtVerify } from "jose";
// // import { routes } from "@/app/lib/routes";

// interface Payload {
//   email: string;
//   role: string;
//   id: string;
// }

// const SECRET_KEY = process.env.SECRET_KEY || "";

// export default async function middleware(request: NextRequest) {
//   //On récupère le cookie dans la requete
//   const { cookies } = request;
//   //On vérifie la présence d'un token
//   const token = cookies.get("token");

//   return await checkToken(token?.value, request);
// }

// //Fonction de vérification du token
// export async function verify(token: string): Promise<any> {
//   console.log("token", token)
//   try {
//     const { payload } = await jwtVerify<Payload>(
//       token,
//       new TextEncoder().encode(SECRET_KEY)
//     );
//     console.log("payload", payload)
//     return payload;

//   } catch (err) { 
//     console.log(err);
//     return null
//   }
// }

// async function checkToken(token: string | undefined, request: NextRequest) {
//   // const currentRoute = findRouteByPathname(request.nextUrl.pathname);
//   let response = NextResponse.next();
//   if (!token) {
//     //On redirige si la route est protégée
//     // if (currentRoute && currentRoute.protected !== "PUBLIC") {
//     //   response = NextResponse.redirect(new URL("/auth/login", request.url));
//     // }
//     if (
//       request.nextUrl.pathname.startsWith("/private") ||
//       request.nextUrl.pathname.startsWith("/privateAdmin")
//     ) {
//       console.log("admin book c sxs")
//       response = NextResponse.redirect(new URL("/auth/login", request.url));
//     } else {
//       response = NextResponse.next();
//     }
//     //On delete les cookies existants
//     console.log('delete cookies')
//     response.cookies.delete("email");
//     response.cookies.delete("role");

//     return response;
//   }
//   try {
//     const { email, role } = await verify(token);
//     console.log("email",email)
//     if (email && role) {
//       if (email && role) {
//         if (
//           request.nextUrl.pathname.startsWith("/auth/login") ||
//           request.nextUrl.pathname.startsWith("/auth/register") 
//         ) {
//           response = NextResponse.redirect(new URL("/", request.url));
//         } else {
//           response = NextResponse.next();
//         }
//         //vérifier si la route commence par admin, et que le payload.role n'est pas admin, je redirige
//         if (
//           request.nextUrl.pathname.startsWith("/admin/books") &&
//           role !== "ADMIN"
//         ) {
//           response = NextResponse.redirect(new URL("/400", request.url));
//         }
//       }

//       //On vérifie que le role de l'utilisateur est "ADMIN" pour les routes "ADMIN"
//       // if (currentRoute?.protected === "ADMIN" && role !== "ADMIN") {
//       //   response = NextResponse.redirect(new URL("/error", request.url)); // Créer une page "Access denied"
//       // }
//       //On ajoute des cookie avec les infos du user
//       console.log('set cookies')
//       response.cookies.set("email", email);
//       response.cookies.set("role", role);

//       return response;
//     }

//     return NextResponse.redirect(new URL("/auth/login", request.url));
//   } catch (err) {
//     console.error("Verification echouée", err);

//     response = NextResponse.redirect(new URL("/auth/login", request.url));
//     //On delete les cookies existants
//     response.cookies.delete("token");
//     response.cookies.delete("email");
//     response.cookies.delete("role");

//     return response;
//   }
// }

// export const config = {
//   matcher: "/:path*",
// };

// function findRouteByPathname(url: string) {
//   if (url === "/") {
//     return routes.home;
//   }
//   const routeKeys = Object.keys(routes).filter((e) => e !== "home");
//   for (const key of routeKeys) {
//     if (url.includes(routes[key].pathname)) {
//       return routes[key];
//     }
//   }
//   return null;
// }







// import { NextResponse } from "next/server";
// import type { NextRequest } from "next/server";
// import { jwtVerify } from "jose";

// interface Payload {
//   email: string;
//   role: string;
// }

// const SECRET_KEY = process.env.SECRET_KEY || "";

// export default async function middleware(request: NextRequest) {
//   const { cookies } = request;
//   const token = cookies.get("token");
  
//   return await checkToken(token?.value, request);
// }

// export async function verify(token: string): Promise<Payload> {
//   const { payload } = await jwtVerify<Payload>(
//     token,
//     new TextEncoder().encode(SECRET_KEY)
//   );
//   return payload;
// }

// async function checkToken(token: string | undefined, request: NextRequest) {
//   let response: NextResponse<unknown> = NextResponse.next();
//   console.log(token)
//   if (request.nextUrl.pathname.startsWith("/auth/logout")) {
//     response.cookies.delete("email");
//     response.cookies.delete("role");
//     console.log("je suis déconnecté")
//     response = NextResponse.redirect(new URL("/auth/login", request.url));
//   }

//   if (!token) {
//     console.log("toto")
//     if (
//       request.nextUrl.pathname.startsWith("/books/list") ||
//       request.nextUrl.pathname.startsWith("/admin/books")
//     ) {
//       console.log("admin book c sxs")
//       response = NextResponse.redirect(new URL("/auth/login", request.url));
//     } else {
//       response = NextResponse.next();
//     }
    
//     response.cookies.delete("email");
//     response.cookies.delete("role");
//     return response;
//   }
  
//   try {
//     const payload = await verify(token);
//     console.log("playload", payload)
//     if (payload.email && payload.role) {
//       if (
//         request.nextUrl.pathname.startsWith("/auth/login") ||
//         request.nextUrl.pathname.startsWith("/auth/register") 
//       ) {
//         response = NextResponse.redirect(new URL("/", request.url));
//       } else {
//         response = NextResponse.next();
//       }
//       //vérifier si la route commence par admin, et que le payload.role n'est pas admin, je redirige
//       if (
//         request.nextUrl.pathname.startsWith("/admin/books") &&
//         payload.role !== "ADMIN"
//       ) {
//         response = NextResponse.redirect(new URL("/400", request.url));
//       }

//       response.cookies.set("email", payload.email);
//       response.cookies.set("role", payload.role);

//       return response;
//     }
//     return NextResponse.redirect(new URL("/auth/login", request.url));
//   } catch (err) {
//     console.error("Verification failed", err);
//     return NextResponse.redirect(new URL("/auth/login", request.url));
//   }
// }

// // export const config = {
// //   matcher: "/books/list/:path*",
// // };
// export const config = {
//   matcher: "/:path*",
// };