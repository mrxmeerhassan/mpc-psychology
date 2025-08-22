import Link from "next/link";
import NavBar from "@/components/NavBar";
import { readAllContent } from "@/lib/mdx";

export const dynamic = "force-static";

export default function ArticlesPage() {
	const items = readAllContent("articles");
	return (
		<div className="min-h-screen bg-gradient-to-br from-cyan-50 via-white to-blue-50">
			<NavBar />
			
			{/* Hero Section */}
			<section className="relative overflow-hidden bg-gradient-to-r from-cyan-600 to-blue-600 text-white">
				<div className="absolute inset-0 bg-black/20"></div>
				<div className="relative mx-auto max-w-6xl px-4 py-20">
					<div className="text-center">
						<h1 className="text-5xl md:text-6xl font-bold mb-6">Psychology Articles</h1>
						<p className="text-xl md:text-2xl text-cyan-100 max-w-3xl mx-auto leading-relaxed">
							Evidence-based insights and practical strategies for mental health and well-being
						</p>
					</div>
				</div>
				<div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white to-transparent"></div>
			</section>

			{/* Articles Grid */}
			<section className="mx-auto max-w-7xl px-4 py-16">
				<div className="mb-12 text-center">
					<h2 className="text-3xl font-bold text-gray-900 mb-4">Latest Articles</h2>
					<p className="text-lg text-gray-600 max-w-2xl mx-auto">
						Discover comprehensive guides and evidence-based approaches to mental health
					</p>
				</div>
				
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
					{items.map((item, index) => (
						<Link 
							key={item.slug} 
							href={`/articles/${item.slug}`} 
							className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 hover:border-cyan-200"
						>
							{/* Card Header */}
							<div className="h-48 bg-gradient-to-br from-cyan-500 to-blue-600 relative overflow-hidden">
								<div className="absolute inset-0 bg-black/20"></div>
								<div className="absolute top-4 left-4">
									<div className="bg-white/20 backdrop-blur-sm rounded-full px-3 py-1 text-white text-sm font-medium">
										Article {index + 1}
									</div>
								</div>
								<div className="absolute inset-0 flex items-center justify-center">
									<div className="text-white text-6xl opacity-20">
										{index + 1}
									</div>
								</div>
							</div>
							
							{/* Card Content */}
							<div className="p-6">
								<div className="flex items-center gap-2 mb-3">
									{item.tags?.slice(0, 2).map((tag) => (
										<span key={tag} className="bg-cyan-100 text-cyan-700 px-2 py-1 rounded-full text-xs font-medium">
											{tag}
										</span>
									))}
								</div>
								
								<h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-cyan-600 transition-colors duration-300 line-clamp-2">
									{item.title}
								</h3>
								
								<p className="text-gray-600 mb-4 line-clamp-3 leading-relaxed">
									{item.description}
								</p>
								
								<div className="flex items-center justify-between">
									<div className="text-sm text-gray-500">
										{item.date && new Date(item.date).toLocaleDateString('en-US', { 
											year: 'numeric', 
											month: 'long', 
											day: 'numeric' 
										})}
									</div>
									<div className="flex items-center text-cyan-600 font-medium group-hover:translate-x-1 transition-transform duration-300">
										Read More
										<svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
											<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
										</svg>
									</div>
								</div>
							</div>
						</Link>
					))}
				</div>
				
				{/* Call to Action */}
				<div className="mt-16 text-center">
					<div className="bg-gradient-to-r from-cyan-600 to-blue-600 rounded-2xl p-8 text-white">
						<h3 className="text-2xl font-bold mb-4">Need Professional Help?</h3>
						<p className="text-cyan-100 mb-6 max-w-2xl mx-auto">
							Our experienced therapists are here to support you on your mental health journey. 
							Book a consultation today.
						</p>
						<Link 
							href="#contact" 
							className="inline-flex items-center bg-white text-cyan-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-300"
						>
							Book a Consultation
							<svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
							</svg>
						</Link>
					</div>
				</div>
			</section>
		</div>
	);
}


