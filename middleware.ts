// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client *within middleware scope*
// Use environment variables directly (ensure they are set in Vercel)
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// Ensure keys are available
if (!supabaseUrl || !supabaseAnonKey) {
    console.error('Middleware: Supabase keys not found in environment!');
    // Optionally return a specific response or let request pass through to potentially fail later
    // return new Response('Configuration error', { status: 500 });
}

// Create a Supabase client instance FOR THE MIDDLEWARE
// NOTE: It's generally recommended to use the Edge-compatible client for middleware
// but the standard client often works for simple reads if dependencies are compatible.
// If issues arise, investigate '@supabase/ssr' or direct fetch calls.
const supabaseMW = createClient(supabaseUrl!, supabaseAnonKey!);

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const host = request.headers.get('host');

  // Define paths to ignore (API routes, static assets, framework files)
  const ignoredPaths = ['/api/', '/_next/', '/images/', '/favicon.ico'];
  if (ignoredPaths.some(p => pathname.startsWith(p))) {
    return NextResponse.next(); // Don't process these paths
  }

  // Only process requests for the homepage ('/') of a custom domain/subdomain
  if (pathname === '/') {
    console.log(`Middleware: Processing host: ${host} for path: ${pathname}`);

    if (!host) {
        return NextResponse.next(); // Cannot determine host
    }

    // Extract potential subdomain part (if using your own domain like *.atlasgrowth.com)
    // This logic assumes your main domain is configured elsewhere or handled differently.
    // Adapt this if your main domain is e.g. atlasgrowth.com
    const yourBaseDomain = 'hvacinvoicepro.com'; // OR atlasgrowth.ai OR your preview domain like atlasgrowth-previews.com
    let subdomainPart: string | null = null;
    if (host !== yourBaseDomain && host.endsWith(`.${yourBaseDomain}`)) {
         subdomainPart = host.replace(`.${yourBaseDomain}`, '');
    }

    try {
      // Query Supabase to find slug based on host or subdomain part
      // Allow reading 'companies' table with anon key + RLS or make columns public
      const { data: company, error } = await supabaseMW
        .from('companies')
        .select('slug')
        // Match either the full custom domain OR the extracted subdomain part
        .or(`custom_domain.eq.${host},subdomain_segment.eq.${subdomainPart}`)
        .neq('slug', null) // Ensure we get a slug back
        .maybeSingle(); // Use maybeSingle to handle 0 or 1 result gracefully

      if (error) {
        console.error('Middleware: Supabase query error:', error.message);
        return NextResponse.next(); // Let it proceed to potentially show homepage or 404
      }

      if (company?.slug) {
        console.log(`Middleware: Found slug '${company.slug}' for host '${host}'. Rewriting to /${company.slug}`);
        // Rewrite the URL internally to the dynamic slug path
        const rewriteUrl = new URL(`/${company.slug}`, request.url);
        return NextResponse.rewrite(rewriteUrl);
      } else {
         console.log(`Middleware: No matching slug found for host '${host}'. Passing through.`);
      }

    } catch (e) {
        console.error('Middleware: Unexpected error:', e);
    }
  }

  // Let other requests pass through untouched
  return NextResponse.next();
}

// Optional: Matcher config to limit middleware execution paths
export const config = {
   matcher: [
     /*
      * Match all request paths except for the ones starting with:
      * - api (API routes)
      * - _next/static (static files)
      * - _next/image (image optimization files)
      * - favicon.ico (favicon file)
      * - images/ (your static images)
      * Match root path '/' explicitly if needed, or allow all non-excluded paths
      */
     '/((?!api|_next/static|_next/image|favicon.ico|images).*)',
     // Might need refinement based on exact needs
   ],
}