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
    const headersList = headers();
    
    // Get client IP from headers
    const ip = headersList.get('x-forwarded-for')?.split(',')[0]?.trim() || 
              headersList.get('x-real-ip') ||
              (process.env.NODE_ENV === 'development' ? '127.0.0.1' : 'unknown');
    
    // Get user agent
    const userAgent = headersList.get('user-agent');

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
