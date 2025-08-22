import { Resend } from 'resend';

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

export async function GET() {
  if (!resend) {
    return Response.json({ 
      error: 'No Resend API key configured',
      message: 'Please add RESEND_API_KEY to environment variables'
    });
  }

  try {
    const result = await resend.emails.send({
      from: 'MPC Psychology Center <onboarding@resend.dev>',
      to: [process.env.CONTACT_TO_EMAIL || 'test@example.com'],
      subject: 'Test Email from MPC Psychology Center',
      html: '<p>This is a test email to verify your email setup is working!</p>',
    });

    console.log('Test email sent successfully:', result);
    return Response.json({ 
      success: true, 
      message: 'Test email sent successfully',
      result 
    });
  } catch (error) {
    console.error('Test email failed:', error);
    return Response.json({ 
      error: 'Failed to send test email',
      details: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}
