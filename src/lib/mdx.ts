import fs from "fs";
import path from "path";
import matter from "gray-matter";

export type ContentMeta = {
	title: string;
	description?: string;
	date?: string;
	tags?: string[];
	slug: string;
};

export function getContentDir(section: "blog" | "articles" | "theories"): string {
	return path.join(process.cwd(), "content", section);
}

export function getAllSlugs(section: "blog" | "articles" | "theories"): string[] {
	const dir = getContentDir(section);
	if (!fs.existsSync(dir)) return [];
	return fs
		.readdirSync(dir)
		.filter((f) => f.endsWith(".mdx") || f.endsWith(".md"))
		.map((f) => f.replace(/\.mdx?$/, ""));
}

export function readContentBySlug(section: "blog" | "articles" | "theories", slug: string): { meta: ContentMeta; content: string } | null {
	const dir = getContentDir(section);
	const filePathMdx = path.join(dir, `${slug}.mdx`);
	const filePathMd = path.join(dir, `${slug}.md`);
	const filePath = fs.existsSync(filePathMdx) ? filePathMdx : fs.existsSync(filePathMd) ? filePathMd : null;
	if (!filePath) return null;
	const file = fs.readFileSync(filePath, "utf8");
	const { data, content } = matter(file);
	const meta: ContentMeta = {
		title: (data.title as string) ?? slug,
		description: (data.description as string) ?? undefined,
		date: (data.date as string) ?? undefined,
		tags: (data.tags as string[]) ?? undefined,
		slug,
	};
	return { meta, content };
}

export function readAllContent(section: "blog" | "articles" | "theories"): Array<ContentMeta> {
	return getAllSlugs(section)
		.map((slug) => readContentBySlug(section, slug))
		.filter((v): v is { meta: ContentMeta; content: string } => Boolean(v))
		.map((v) => v.meta)
		.sort((a, b) => (a.date && b.date ? +new Date(b.date) - +new Date(a.date) : 0));
}


