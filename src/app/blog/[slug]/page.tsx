import { readAllContent, readContentBySlug } from "@/lib/mdx";

import { MDXRemote } from "next-mdx-remote/rsc";

export function generateStaticParams() {
	return readAllContent("blog").map((m) => ({ slug: m.slug }));
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
	const { slug } = await params;
	const data = readContentBySlug("blog", slug);
	if (!data) return <div>Not found</div>;
	return (
		<div>
			<article className="prose prose-emerald mx-auto max-w-3xl px-4 py-12 dark:prose-invert">
				<h1>{data.meta.title}</h1>
				<MDXRemote source={data.content} options={{ mdxOptions: { remarkPlugins: [] } }} />
			</article>
		</div>
	);
}


