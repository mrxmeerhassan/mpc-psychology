import Link from "next/link";

import { readAllContent } from "@/lib/mdx";

export const dynamic = "force-static";

export default function BlogPage() {
	const posts = readAllContent("blog");
	return (
		<div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
			
			{/* Hero Section */}
			<section className="relative overflow-hidden bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
				<div className="absolute inset-0 bg-black/20"></div>
				<div className="relative mx-auto max-w-6xl px-4 py-20">
					<div className="text-center">
						<h1 className="text-5xl md:text-6xl font-bold mb-6">Mental Health Blog</h1>
						<p className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto leading-relaxed">
							Insights, stories, and expert perspectives on mental health and wellness
						</p>
					</div>
				</div>
				<div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white to-transparent"></div>
			</section>

			{/* Blog Posts Grid */}
			<section className="mx-auto max-w-7xl px-4 py-16">
				<div className="mb-12 text-center">
					<h2 className="text-3xl font-bold text-gray-900 mb-4">Latest Blog Posts</h2>
					<p className="text-lg text-gray-600 max-w-2xl mx-auto">
						Stay informed with the latest research, tips, and insights from our mental health experts
					</p>
				</div>
				
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
					        {posts.map((post) => (
						<Link 
							key={post.slug} 
							href={`/blog/${post.slug}`} 
							className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 hover:border-blue-200"
						>
							{/* Card Header */}
							<div className="h-48 bg-gradient-to-br from-blue-500 to-indigo-600 relative overflow-hidden">
								<div className="absolute inset-0 bg-black/20"></div>
								<div className="absolute top-4 left-4">
									<div className="bg-white/20 backdrop-blur-sm rounded-full px-3 py-1 text-white text-sm font-medium">
										Blog Post
									</div>
								</div>
								<div className="absolute inset-0 flex items-center justify-center">
									<svg className="w-16 h-16 text-white opacity-20" fill="currentColor" viewBox="0 0 24 24">
										<path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
									</svg>
								</div>
							</div>
							
							{/* Card Content */}
							<div className="p-6">
								<div className="flex items-center gap-2 mb-3">
									{post.tags?.slice(0, 2).map((tag) => (
										<span key={tag} className="bg-blue-100 text-blue-700 px-2 py-1 rounded-full text-xs font-medium">
											{tag}
										</span>
									))}
								</div>
								
								<h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors duration-300 line-clamp-2">
									{post.title}
								</h3>
								
								<p className="text-gray-600 mb-4 line-clamp-3 leading-relaxed">
									{post.description}
								</p>
								
								<div className="flex items-center justify-between">
									<div className="text-sm text-gray-500">
										{post.date && new Date(post.date).toLocaleDateString('en-US', { 
											year: 'numeric', 
											month: 'long', 
											day: 'numeric' 
										})}
									</div>
									<div className="flex items-center text-blue-600 font-medium group-hover:translate-x-1 transition-transform duration-300">
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
				
				{/* Newsletter Signup */}
				<div className="mt-16 text-center">
					<div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-8 text-white">
						<h3 className="text-2xl font-bold mb-4">Stay Updated</h3>
						<p className="text-blue-100 mb-6 max-w-2xl mx-auto">
							Subscribe to our newsletter for the latest mental health insights, tips, and expert advice delivered to your inbox.
						</p>
						<div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
							<input 
								type="email" 
								placeholder="Enter your email" 
								className="flex-1 px-4 py-3 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-white"
							/>
							<button className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-300">
								Subscribe
							</button>
						</div>
					</div>
				</div>
			</section>
		</div>
	);
}


