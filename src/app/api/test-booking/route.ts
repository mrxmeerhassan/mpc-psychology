export async function POST(request: Request): Promise<Response> {
	try {
		const body = await request.json();
		
		console.log("Test booking received:", body);
		
		// Check if required fields are present
		if (!body.name || !body.email || !body.concerns) {
			return Response.json({ 
				error: "Missing required fields", 
				received: body,
				required: ["name", "email", "concerns"]
			}, { status: 400 });
		}
		
		// Check environment variables
		const envCheck = {
			RESEND_API_KEY: process.env.RESEND_API_KEY ? "Configured" : "Missing",
			CONTACT_TO_EMAIL: process.env.CONTACT_TO_EMAIL || "meerhassan11@icloud.com"
		};
		
		return Response.json({ 
			success: true, 
			message: "Test booking received successfully",
			data: body,
			environment: envCheck
		});
		
	} catch (error) {
		console.error("Test booking error:", error);
		return Response.json({ 
			error: "Failed to process test booking",
			details: error instanceof Error ? error.message : "Unknown error"
		}, { status: 500 });
	}
}
