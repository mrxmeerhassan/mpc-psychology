import { Resend } from 'resend';

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

export async function POST(request: Request): Promise<Response> {
	try {
		const { name, email, phone, preferredTime, concerns, therapyType, urgency } = await request.json();
		
		if (!name || !email || !concerns) {
			return Response.json({ ok: false, error: "Missing required fields" }, { status: 400 });
		}

		const toEmail = process.env.CONTACT_TO_EMAIL || "your-email@example.com";
		const fromEmail = process.env.FROM_EMAIL || "noreply@mpc-psychology.com";

		// Email to the therapist/clinic
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

					<div style="background: #f0f9ff; padding: 20px; border-radius: 8px; border: 1px solid #0ea5e9;">
						<h3 style="color: #0c4a6e; margin-top: 0;">Next Steps</h3>
						<ul style="color: #1e40af; margin: 10px 0;">
							<li>Review the client's information and concerns</li>
							<li>Contact the client within 24 hours</li>
							<li>Schedule the free 15-minute consultation</li>
							<li>Prepare for the initial session</li>
						</ul>
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

		// Email to the client (confirmation)
		const clientEmailHtml = `
			<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
				<div style="background: linear-gradient(135deg, #0ea5e9, #0284c7); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
					<h1 style="margin: 0; font-size: 24px;">Consultation Request Confirmed</h1>
					<p style="margin: 10px 0 0 0; opacity: 0.9;">MPC Psychology Center</p>
				</div>
				
				<div style="background: white; padding: 30px; border: 1px solid #e5e7eb; border-radius: 0 0 10px 10px;">
					<p style="color: #374151; font-size: 16px; line-height: 1.6;">
						Dear ${name},
					</p>
					
					<p style="color: #374151; font-size: 16px; line-height: 1.6;">
						Thank you for reaching out to MPC Psychology Center. We have received your consultation request and are excited to help you on your mental health journey.
					</p>

					<div style="background: #f0f9ff; padding: 20px; border-radius: 8px; border: 1px solid #0ea5e9; margin: 20px 0;">
						<h3 style="color: #0c4a6e; margin-top: 0;">What Happens Next?</h3>
						<ol style="color: #1e40af; line-height: 1.8;">
							<li><strong>Within 24 hours:</strong> One of our therapists will contact you to schedule your free 15-minute consultation</li>
							<li><strong>Free Consultation:</strong> We'll discuss your needs, answer your questions, and see if we're a good fit</li>
							<li><strong>Personalized Plan:</strong> If we're a match, we'll create a treatment plan tailored to your goals</li>
						</ol>
					</div>

					<div style="background: #f9fafb; padding: 20px; border-radius: 8px; margin: 20px 0;">
						<h3 style="color: #374151; margin-top: 0;">Your Request Details</h3>
						<p style="color: #6b7280; margin: 5px 0;"><strong>Urgency Level:</strong> ${urgency.charAt(0).toUpperCase() + urgency.slice(1)}</p>
						${therapyType ? `<p style="color: #6b7280; margin: 5px 0;"><strong>Therapy Type:</strong> ${therapyType}</p>` : ''}
						${preferredTime ? `<p style="color: #6b7280; margin: 5px 0;"><strong>Preferred Time:</strong> ${preferredTime}</p>` : ''}
					</div>

					<div style="background: #ecfdf5; padding: 20px; border-radius: 8px; border: 1px solid #10b981; margin: 20px 0;">
						<h3 style="color: #065f46; margin-top: 0;">Why Choose MPC?</h3>
						<ul style="color: #047857; line-height: 1.8;">
							<li>✓ Evidence-based therapeutic approaches</li>
							<li>✓ Experienced, licensed professionals</li>
							<li>✓ Flexible online and in-person sessions</li>
							<li>✓ Compassionate, judgment-free environment</li>
							<li>✓ Personalized treatment plans</li>
						</ul>
					</div>

					<p style="color: #374151; font-size: 16px; line-height: 1.6;">
						If you have any urgent concerns or need immediate support, please don't hesitate to reach out. We're here to help.
					</p>

					<p style="color: #374151; font-size: 16px; line-height: 1.6;">
						Warm regards,<br>
						<strong>The MPC Psychology Center Team</strong>
					</p>

					<hr style="border: none; border-top: 1px solid #e5e7eb; margin: 30px 0;">
					
					<p style="color: #6b7280; font-size: 14px; text-align: center;">
						This email was sent in response to your consultation request. 
						If you didn't request this consultation, please ignore this email.
					</p>
				</div>
			</div>
		`;

		if (resend) {
			try {
				// Send email to therapist
				await resend.emails.send({
					from: `MPC Psychology Center <${fromEmail}>`,
					to: [toEmail],
					subject: `New Consultation Request - ${name} (${urgency} urgency)`,
					html: therapistEmailHtml,
					replyTo: email,
				});

				// Send confirmation email to client
				await resend.emails.send({
					from: `MPC Psychology Center <${fromEmail}>`,
					to: [email],
					subject: "Your Consultation Request - MPC Psychology Center",
					html: clientEmailHtml,
				});

				console.log("Consultation request processed successfully", { name, email });
				return Response.json({ ok: true });

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
				
				return Response.json({ ok: true, message: "Request received, but email delivery failed" });
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
			
			return Response.json({ ok: true, message: "Request received successfully" });
		}

	} catch (err) {
		console.error("API error", err);
		return Response.json({ ok: false, error: "Invalid payload" }, { status: 400 });
	}
}


