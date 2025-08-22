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
		const fromEmail = "onboarding@resend.dev"; // Use Resend's verified domain

		// Therapist email template
		const therapistEmailHtml = `
			<h2>New Consultation Request</h2>
			<p><strong>Name:</strong> ${name}</p>
			<p><strong>Email:</strong> ${email}</p>
			<p><strong>Phone:</strong> ${phone || 'Not provided'}</p>
			<p><strong>Preferred Time:</strong> ${preferredTime || 'Not specified'}</p>
			<p><strong>Therapy Type:</strong> ${therapyType || 'Not specified'}</p>
			<p><strong>Urgency:</strong> ${urgency || 'Not specified'}</p>
			<p><strong>Concerns:</strong></p>
			<p>${concerns}</p>
			<p><em>This request was submitted from your website contact form.</em></p>
		`;

		// Client confirmation email template
		const clientEmailHtml = `
			<h2>Thank you for your consultation request!</h2>
			<p>Dear ${name},</p>
			<p>We have received your consultation request and will get back to you within 24 hours.</p>
			<p><strong>Your request details:</strong></p>
			<ul>
				<li><strong>Name:</strong> ${name}</li>
				<li><strong>Email:</strong> ${email}</li>
				<li><strong>Phone:</strong> ${phone || 'Not provided'}</li>
				<li><strong>Preferred Time:</strong> ${preferredTime || 'Not specified'}</li>
				<li><strong>Therapy Type:</strong> ${therapyType || 'Not specified'}</li>
				<li><strong>Urgency:</strong> ${urgency || 'Not specified'}</li>
				<li><strong>Concerns:</strong> ${concerns}</li>
			</ul>
			<p>We look forward to helping you on your journey to better mental health.</p>
			<p>Best regards,<br>MPC Psychology Center Team</p>
		`;

		if (resend) {
			try {
				// Send email to therapist (only if it's the verified email)
				if (toEmail === "meerhassan11@icloud.com") {
					await resend.emails.send({
						from: `MPC Psychology Center <${fromEmail}>`,
						to: [toEmail],
						subject: `New Consultation Request - ${name} (${urgency} urgency)`,
						html: therapistEmailHtml,
						replyTo: email,
					});
				}

				// Send confirmation email to client (only if it's the verified email)
				if (email === "meerhassan11@icloud.com") {
					await resend.emails.send({
						from: `MPC Psychology Center <${fromEmail}>`,
						to: [email],
						subject: "Your Consultation Request - MPC Psychology Center",
						html: clientEmailHtml,
					});
				}

				console.log("Consultation request processed successfully", { name, email });
				return Response.json({ ok: true, message: "Request received successfully. You will receive a confirmation email shortly." });
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


