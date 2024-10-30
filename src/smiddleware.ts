// // middleware.ts
// import { NextResponse } from 'next/server';
// import { NextRequest } from 'next/server';
// import jwt from 'jsonwebtoken';

// // Routes that require authentication
// const authRoutes = [
//   '/api/events',
//   '/api/venues',
//   '/api/categories',
// ];

// // Routes that require admin role
// const adminRoutes = [
//   '/api/events/create',
//   '/api/events/edit',
//   '/api/events/delete',
//   '/api/venues/create',
//   '/api/categories/create',
// ];

// // Function to verify token
// function verifyToken(token: string) {
//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET || '');
//     return decoded;
//     // eslint-disable-next-line @typescript-eslint/no-unused-vars
//   } catch (error) {
//     return null;
//   }
// }

// export async function middleware(request: NextRequest) {
//   // Get the pathname
//   const path = request.nextUrl.pathname;

//   // Skip middleware if path is not protected
//   if (!authRoutes.some(route => path.startsWith(route)) &&
//     !adminRoutes.some(route => path.startsWith(route))) {
//     return NextResponse.next();
//   }

//   // Get token from header
//   const token = request.headers.get('authorization')?.split(' ')[1];

//   if (!token) {
//     return new NextResponse(
//       JSON.stringify({
//         success: false,
//         message: 'Authentication required'
//       }),
//       {
//         status: 401,
//         headers: { 'content-type': 'application/json' },
//       }
//     );
//   }

//   // Verify token
//   // eslint-disable-next-line @typescript-eslint/no-explicit-any
//   const decoded = verifyToken(token) as any;

//   if (!decoded) {
//     return new NextResponse(
//       JSON.stringify({
//         success: false,
//         message: 'Invalid token'
//       }),
//       {
//         status: 401,
//         headers: { 'content-type': 'application/json' },
//       }
//     );
//   }

//   // Check admin routes
//   if (adminRoutes.some(route => path.startsWith(route))) {
//     // Verify admin role
//     if (decoded.role !== 'ADMIN') {
//       return new NextResponse(
//         JSON.stringify({
//           success: false,
//           message: 'Admin access required'
//         }),
//         {
//           status: 403,
//           headers: { 'content-type': 'application/json' },
//         }
//       );
//     }
//   }

//   // Modify request headers to pass user info to API routes
//   const requestHeaders = new Headers(request.headers);
//   requestHeaders.set('user', JSON.stringify(decoded));

//   // Continue with modified headers
//   return NextResponse.next({
//     request: {
//       headers: requestHeaders,
//     }
//   });
// }

// // Configure which routes use this middleware
// export const config = {
//   matcher: [
//     // Protected API routes
//     '/api/events/:path*',
//     '/api/venues/:path*',
//     '/api/categories/:path*',
//     // Add more protected routes as needed
//   ]
// };