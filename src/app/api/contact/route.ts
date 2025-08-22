import { Resend } from 'resend';

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

export async function POST(request: Request): Promise<Response> {
	try {
		const { name, email, phone, preferredTime, concerns, therapyType, urgency } = await request.json();

		// Validate required fields
		if (!name || !email || !concerns) {
			return Response.json({ error: "Name, email, and concerns are required" }, { status: 400 });
		}

		const toEmail = process.env.CONTACT_TO_EMAIL || "meerhassan11@icloud.com";
		
		// Use Resend's default domain (works with verified emails)
		const fromEmail = "onboarding@resend.dev";

		// Therapist email template
		const therapistEmailHtml = `
			<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
				<div style="background: linear-gradient(135deg, #0ea5e9, #0284c7); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
					<h1 style="margin: 0; font-size: 24px;">New Consultation Request</h1>
					<p style="margin: 10px 0 0 0; opacity: 0.9;">MPC Psychology Center</p>
				</div>
				
				<div style="background: white; padding: 30px; border: 1px solid #e5e7eb; border-radius: 0 0 10px 10px;">
					<h2 style="color: #1f2937; margin-top: 0;">Client Information</h2>
					
					<div style="margin-bottom: 20px;">
						<strong style="color: #374151;">Name:</strong> ${name}<br>
						<strong style="color: #374151;">Email:</strong> <a href="mailto:${email}" style="color: #0ea5e9;">${email}</a><br>
						${phone ? `<strong style="color: #374151;">Phone:</strong> ${phone}<br>` : ''}
						<strong style="color: #374151;">Urgency Level:</strong> <span style="color: ${urgency === 'high' ? '#dc2626' : urgency === 'medium' ? '#ea580c' : '#059669'}; font-weight: bold;">${urgency.charAt(0).toUpperCase() + urgency.slice(1)}</span>
					</div>

					${therapyType ? `
					<div style="margin-bottom: 20px;">
						<strong style="color: #374151;">Preferred Therapy Type:</strong> ${therapyType}
					</div>
					` : ''}

					${preferredTime ? `
					<div style="margin-bottom: 20px;">
						<strong style="color: #374151;">Preferred Time:</strong> ${preferredTime}
					</div>
					` : ''}

					<div style="margin-bottom: 20px;">
						<strong style="color: #374151;">Concerns & Goals:</strong>
						<div style="background: #f9fafb; padding: 15px; border-radius: 8px; margin-top: 10px; border-left: 4px solid #0ea5e9;">
							${concerns.replace(/\n/g, '<br>')}
						</div>
					</div>

					<div style="text-align: center; margin-top: 30px;">
						<a href="mailto:${email}?subject=Re: Your Consultation Request - MPC Psychology Center" 
						   style="background: #0ea5e9; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block;">
							Reply to Client
						</a>
					</div>
				</div>
			</div>
		`;

		if (resend) {
			try {
				// Send email to therapist (verified email - always works)
				await resend.emails.send({
					from: `MPC Psychology Center <${fromEmail}>`,
					to: [toEmail],
					subject: `New Consultation Request - ${name} (${urgency} urgency)`,
					html: therapistEmailHtml,
					replyTo: email,
				});

				console.log("Consultation request processed successfully", { name, email });
				return Response.json({ 
					ok: true, 
					message: "Thank you! Your consultation request has been received. We will contact you within 24 hours.",
					note: "You can also contact us directly at meerhassan11@icloud.com if you need immediate assistance."
				});
			} catch (error) {
				console.error("Failed to send emails", error);
				
				// Fallback: log the request for manual processing
				console.log("Consultation request (email failed)", {
					name,
					email,
					phone,
					preferredTime,
					concerns,
					therapyType,
					urgency,
					timestamp: new Date().toISOString()
				});
				
				return Response.json({ ok: true, message: "Request received successfully. We will contact you soon." });
			}
		} else {
			// No email service configured - just log the request
			console.log("Consultation request (no email service)", {
				name,
				email,
				phone,
				preferredTime,
				concerns,
				therapyType,
				urgency,
				timestamp: new Date().toISOString()
			});
			
			return Response.json({ ok: true, message: "Request received successfully. We will contact you soon." });
		}
	} catch (error) {
		console.error("Failed to process request", error);
		return Response.json({ error: "Failed to process request" }, { status: 500 });
	}
}


