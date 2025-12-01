import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { password } = body;

    const adminPassword = process.env.ADMIN_PASSWORD;
    
    // Debug logging (remove after troubleshooting)
    console.log('Login attempt:', {
      receivedPasswordLength: password?.length,
      envPasswordExists: !!adminPassword,
      envPasswordLength: adminPassword?.length,
      passwordsMatch: password === adminPassword
    });

    if (!adminPassword) {
      console.error('ADMIN_PASSWORD environment variable is not set!');
      return NextResponse.json(
        { error: 'Server configuration error' },
        { status: 500 }
      );
    }

    if (password === adminPassword) {
      // Set a session cookie
      const response = NextResponse.json({ success: true });
      response.cookies.set('admin_session', adminPassword, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 60 * 60 * 24 // 24 hours
      });
      return response;
    }

    return NextResponse.json(
      { error: 'Invalid password' },
      { status: 401 }
    );
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
