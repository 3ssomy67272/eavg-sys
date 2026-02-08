import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { type, ...payload } = await request.json();
    
    let webhookUrl;
    if (type === 'contact') {
      webhookUrl = process.env.CONTACT_WEBHOOK_URL || process.env.NEXT_PUBLIC_CONTACT_WEBHOOK_URL;
    } else {
      // Default to application webhook for backward compatibility
      webhookUrl = process.env.DISCORD_WEBHOOK_URL || process.env.NEXT_PUBLIC_DISCORD_WEBHOOK_URL;
    }

    if (!webhookUrl || webhookUrl === 'YOUR_CONTACT_WEBHOOK_URL_HERE') {
      console.error(`Webhook URL for ${type || 'application'} is not defined or is default placeholder`);
      return NextResponse.json(
        { error: `Webhook configuration for ${type || 'application'} missing` },
        { status: 500 }
      );
    }

    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => null);
      const errorText = errorData ? JSON.stringify(errorData) : await response.text();
      console.error('Discord API error:', response.status, errorText);
      return NextResponse.json(
        { error: `Discord API error: ${response.status}`, details: errorText },
        { status: response.status }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('Internal API error:', error);
    return NextResponse.json(
      { error: 'Internal server error', message: error.message },
      { status: 500 }
    );
  }
}
