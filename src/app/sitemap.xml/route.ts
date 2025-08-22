import { readAllContent } from "@/lib/mdx";

export const dynamic = "force-static";

export function GET(): Response {
	const site = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
	const urls = [
		"/",
		"/articles",
		"/blog",
		"/theories",
		"/assessments",
		...readAllContent("articles").map((m) => `/articles/${m.slug}`),
		...readAllContent("blog").map((m) => `/blog/${m.slug}`),
		...readAllContent("theories").map((m) => `/theories/${m.slug}`),
	];
	const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls
		.map((u) => `<url><loc>${site}${u}</loc></url>`)
		.join("")}</urlset>`;
	return new Response(xml, { headers: { "Content-Type": "application/xml" } });
}


