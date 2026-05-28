import { clerkMiddleware } from "@clerk/nextjs/server";
import { NextResponse, type NextRequest } from "next/server";

// Passthrough middleware when Clerk is not configured
function noopMiddleware() {
    return NextResponse.next();
}

const hasClerkConfig = !!(process.env.CLERK_PUBLISHABLE_KEY && process.env.CLERK_SECRET_KEY);

export default hasClerkConfig
    ? clerkMiddleware(
        async () => {
            // Auth disabled for development — all routes are public.
            // To re-enable, restore the isPublicRoute matcher and call auth.protect().
        },
        {
            publishableKey: process.env.CLERK_PUBLISHABLE_KEY,
            secretKey: process.env.CLERK_SECRET_KEY,
        }
    )
    : noopMiddleware;

export const config = {
    matcher: [
        // Skip Next.js internals and all static files, unless found in search params
        "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
        // Always run for API routes
        "/(api|trpc)(.*)",
    ],
};
