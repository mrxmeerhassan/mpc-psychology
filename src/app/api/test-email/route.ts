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
    // Only send to verified email address
    const testEmail = "meerhassan11@icloud.com";
    
    const result = await resend.emails.send({
      from: 'MPC Psychology Center <onboarding@resend.dev>',
      to: [testEmail],
      subject: 'Test Email from MPC Psychology Center',
      html: `
        <h2>Test Email Success!</h2>
        <p>Your email setup is working correctly.</p>
        <p>This test email was sent to: ${testEmail}</p>
        <p>Time: ${new Date().toLocaleString()}</p>
      `,
    });

    console.log('Test email sent successfully:', result);
    return Response.json({ 
      success: true, 
      message: 'Test email sent successfully to verified email',
      sentTo: testEmail,
      result 
    });
  } catch (error) {
    console.error('Test email failed:', error);
    return Response.json({ 
      error: 'Failed to send test email',
      details: error instanceof Error ? error.message : 'Unknown error',
      note: 'Make sure you are using the verified email address (meerhassan11@icloud.com)'
    });
  }
}
