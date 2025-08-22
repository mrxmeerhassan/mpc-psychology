import { readAllContent, readContentBySlug } from "@/lib/mdx";
import NavBar from "@/components/NavBar";
import { MDXRemote } from "next-mdx-remote/rsc";
import Link from "next/link";

export function generateStaticParams() {
	return readAllContent("articles").map((m) => ({ slug: m.slug }));
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
	const { slug } = await params;
	const data = readContentBySlug("articles", slug);
	if (!data) return <div>Not found</div>;
	
	return (
		<div className="min-h-screen bg-gradient-to-br from-cyan-50 via-white to-blue-50">
			<NavBar />
			
			{/* Article Header */}
			<section className="relative overflow-hidden bg-gradient-to-r from-cyan-600 to-blue-600 text-white">
				<div className="absolute inset-0 bg-black/20"></div>
				<div className="relative mx-auto max-w-4xl px-4 py-16">
					<div className="text-center">
						<div className="flex items-center justify-center gap-2 mb-6">
							{data.meta.tags?.slice(0, 3).map((tag) => (
								<span key={tag} className="bg-white/20 backdrop-blur-sm rounded-full px-3 py-1 text-white text-sm font-medium">
									{tag}
								</span>
							))}
						</div>
						<h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
							{data.meta.title}
						</h1>
						<p className="text-xl text-cyan-100 max-w-3xl mx-auto leading-relaxed">
							{data.meta.description}
						</p>
						{data.meta.date && (
							<div className="mt-6 text-cyan-100">
								Published on {new Date(data.meta.date).toLocaleDateString('en-US', { 
									year: 'numeric', 
									month: 'long', 
									day: 'numeric' 
								})}
							</div>
						)}
					</div>
				</div>
				<div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white to-transparent"></div>
			</section>

			{/* Article Content */}
			<section className="mx-auto max-w-4xl px-4 py-16">
				<div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
					<article className="prose prose-lg prose-cyan max-w-none">
						<MDXRemote source={data.content} options={{ mdxOptions: { remarkPlugins: [] } }} />
					</article>
				</div>
				
				{/* Related Articles */}
				<div className="mt-16">
					<h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Related Articles</h2>
					<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
						{readAllContent("articles")
							.filter(article => article.slug !== slug)
							.slice(0, 4)
							.map((article) => (
								<Link 
									key={article.slug} 
									href={`/articles/${article.slug}`}
									className="group bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 border border-gray-100 hover:border-cyan-200"
								>
									<h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-cyan-600 transition-colors duration-300">
										{article.title}
									</h3>
									<p className="text-gray-600 mb-4 line-clamp-2">
										{article.description}
									</p>
									<div className="flex items-center text-cyan-600 font-medium group-hover:translate-x-1 transition-transform duration-300">
										Read Article
										<svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
											<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
										</svg>
									</div>
								</Link>
							))}
					</div>
				</div>
				
				{/* Call to Action */}
				<div className="mt-16 text-center">
					<div className="bg-gradient-to-r from-cyan-600 to-blue-600 rounded-2xl p-8 text-white">
						<h3 className="text-2xl font-bold mb-4">Need Professional Support?</h3>
						<p className="text-cyan-100 mb-6 max-w-2xl mx-auto">
							If you&apos;re struggling with mental health challenges, our experienced therapists are here to help. 
							Book a consultation for personalized support.
						</p>
						<div className="flex flex-col sm:flex-row gap-4 justify-center">
							<Link 
								href="#contact" 
								className="inline-flex items-center bg-white text-cyan-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-300"
							>
								Book a Consultation
								<svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
								</svg>
							</Link>
							<Link 
								href="/assessments" 
								className="inline-flex items-center border-2 border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-cyan-600 transition-colors duration-300"
							>
								Take Assessment
								<svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
								</svg>
							</Link>
						</div>
					</div>
				</div>
			</section>
		</div>
	);
}


