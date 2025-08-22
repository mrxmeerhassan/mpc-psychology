import { readAllContent, readContentBySlug } from "@/lib/mdx";

export const dynamic = "force-static";

export function GET(): Response {
	const site = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
	const posts = readAllContent("blog");
	const items = posts
		.map((p) => {
			const full = readContentBySlug("blog", p.slug);
			const content = full?.content ?? "";
			return `<item><title>${escapeXml(p.title)}</title><link>${site}/blog/${p.slug}</link><description>${escapeXml(
				p.description || ""
			)}</description><guid>${site}/blog/${p.slug}</guid><pubDate>${p.date ?? ""}</pubDate><content:encoded><![CDATA[${content}]]></content:encoded></item>`;
		})
		.join("");
	const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<rss version="2.0" xmlns:content="http://purl.org/rss/1.0/modules/content/"><channel><title>Joy Drop Healing Blog</title><link>${site}</link><description>Updates and reflections</description>${items}</channel></rss>`;
	return new Response(xml, { headers: { "Content-Type": "application/rss+xml" } });
}

function escapeXml(input: string): string {
	return input
		.replaceAll("&", "&amp;")
		.replaceAll("<", "&lt;")
		.replaceAll(">", "&gt;")
		.replaceAll('"', "&quot;")
		.replaceAll("'", "&apos;");
}


