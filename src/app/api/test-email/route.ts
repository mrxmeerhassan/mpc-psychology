import { Resend } from 'resend';

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

export async function GET() {
  if (!resend) {
    return Response.json({ 
      error: 'No Resend API key configured',
      message: 'Please add RESEND_API_KEY to environment variables',
      note: 'Go to Vercel → Settings → Environment Variables → Add RESEND_API_KEY'
    });
  }

  try {
    // Test with any email address
    const testEmail = "hassanmeer560@gmail.com"; // Change this to any email you want to test
    
    const result = await resend.emails.send({
      from: 'MPC Psychology Center <onboarding@resend.dev>',
      to: [testEmail],
      subject: 'Test Email from MPC Psychology Center',
      html: `
        <h2>Test Email Success!</h2>
        <p>Your email setup is working correctly.</p>
        <p>This test email was sent to: ${testEmail}</p>
        <p>Time: ${new Date().toLocaleString()}</p>
        <p>API Key: ${process.env.RESEND_API_KEY ? 'Configured' : 'Missing'}</p>
      `,
    });

    console.log('Test email sent successfully:', result);
    return Response.json({ 
      success: true, 
      message: 'Test email sent successfully',
      sentTo: testEmail,
      result,
      apiKeyStatus: process.env.RESEND_API_KEY ? 'Configured' : 'Missing'
    });
  } catch (error) {
    console.error('Test email failed:', error);
    return Response.json({ 
      error: 'Failed to send test email',
      details: error instanceof Error ? error.message : 'Unknown error',
      apiKeyStatus: process.env.RESEND_API_KEY ? 'Configured' : 'Missing',
      note: 'Check your Resend API key and email configuration'
    });
  }
}
