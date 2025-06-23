import { NextResponse } from 'next/server';
import { headers } from 'next/headers';

// Define the response type for better type safety
interface ClientInfoResponse {
  ip: string;
  userAgent: string | null;
  timestamp: string;
  success: boolean;
  error?: string;
}


export async function GET(): Promise<NextResponse<ClientInfoResponse>> {
  try {
    // Get headers - in Next.js 13+, headers() returns a Promise<ReadonlyHeaders>
    const headersList = await headers();
    
    // Get header values directly from the headers object
    const getHeader = (key: string): string | null => {
      try {
        return headersList.get(key);
      } catch (error) {
        console.error('Error accessing headers:', error);
        return null;
      }
    };
    
    // Get client IP from headers
    const forwardedFor = getHeader('x-forwarded-for');
    const realIp = getHeader('x-real-ip');
    
    // Safely handle the IP extraction
    const ip = (forwardedFor ? forwardedFor.split(',')[0].trim() : null) || 
              realIp ||
              (process.env.NODE_ENV === 'development' ? '127.0.0.1' : 'unknown');
    
    // Get user agent
    const userAgent = getHeader('user-agent');

    return NextResponse.json({
      ip,
      userAgent,
      timestamp: new Date().toISOString(),
      success: true
    });
    
  } catch (error) {
    console.error('Error in client-info API:', error);
    
    return NextResponse.json(
      { 
        ip: 'unknown',
        userAgent: null,
        timestamp: new Date().toISOString(),
        success: false,
        error: error instanceof Error ? error.message : 'Failed to fetch client info'
      },
      { status: 500 }
    );
  }
}

// Ensure this route is always dynamically evaluated
export const dynamic = 'force-dynamic';
