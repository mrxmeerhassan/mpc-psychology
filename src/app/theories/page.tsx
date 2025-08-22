import Link from "next/link";
import NavBar from "@/components/NavBar";
import { readAllContent } from "@/lib/mdx";

export const dynamic = "force-static";

export default function TheoriesPage() {
	const theories = readAllContent("theories");
	
	// Theory-specific icons and colors
	const theoryData = {
		'cbt': { icon: '🧠', color: 'from-purple-500 to-indigo-600', bgColor: 'from-purple-50 to-indigo-50' },
		'act': { icon: '🌱', color: 'from-green-500 to-emerald-600', bgColor: 'from-green-50 to-emerald-50' },
		'dbt': { icon: '⚖️', color: 'from-blue-500 to-cyan-600', bgColor: 'from-blue-50 to-cyan-50' },
		'mbct': { icon: '🧘', color: 'from-orange-500 to-amber-600', bgColor: 'from-orange-50 to-amber-50' },
		'psychodynamic': { icon: '🔍', color: 'from-red-500 to-pink-600', bgColor: 'from-red-50 to-pink-50' },
		'person-centered': { icon: '🤝', color: 'from-teal-500 to-cyan-600', bgColor: 'from-teal-50 to-cyan-50' },
		'behavioral': { icon: '📊', color: 'from-gray-500 to-slate-600', bgColor: 'from-gray-50 to-slate-50' },
		'attachment': { icon: '💝', color: 'from-rose-500 to-pink-600', bgColor: 'from-rose-50 to-pink-50' }
	};

	return (
		<div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-indigo-50">
			<NavBar />
			
			{/* Hero Section */}
			<section className="relative overflow-hidden bg-gradient-to-r from-purple-600 to-indigo-600 text-white">
				<div className="absolute inset-0 bg-black/20"></div>
				<div className="relative mx-auto max-w-6xl px-4 py-20">
					<div className="text-center">
						<h1 className="text-5xl md:text-6xl font-bold mb-6">Psychological Theories</h1>
						<p className="text-xl md:text-2xl text-purple-100 max-w-3xl mx-auto leading-relaxed">
							Explore evidence-based therapeutic approaches and psychological frameworks
						</p>
					</div>
				</div>
				<div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white to-transparent"></div>
			</section>

			{/* Theories Grid */}
			<section className="mx-auto max-w-7xl px-4 py-16">
				<div className="mb-12 text-center">
					<h2 className="text-3xl font-bold text-gray-900 mb-4">Therapeutic Approaches</h2>
					<p className="text-lg text-gray-600 max-w-2xl mx-auto">
						Discover the scientific foundations and practical applications of modern psychotherapy
					</p>
				</div>
				
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
					{theories.map((theory) => {
						const theoryKey = theory.slug as keyof typeof theoryData;
						const data = theoryData[theoryKey] || { icon: '🧠', color: 'from-purple-500 to-indigo-600', bgColor: 'from-purple-50 to-indigo-50' };
						
						return (
							<Link 
								key={theory.slug} 
								href={`/theories/${theory.slug}`} 
								className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 hover:border-purple-200"
							>
								{/* Card Header */}
								<div className={`h-48 bg-gradient-to-br ${data.color} relative overflow-hidden`}>
									<div className="absolute inset-0 bg-black/20"></div>
									<div className="absolute top-4 left-4">
										<div className="bg-white/20 backdrop-blur-sm rounded-full px-3 py-1 text-white text-sm font-medium">
											Theory
										</div>
									</div>
									<div className="absolute inset-0 flex items-center justify-center">
										<div className="text-white text-8xl opacity-30">
											{data.icon}
										</div>
									</div>
								</div>
								
								{/* Card Content */}
								<div className="p-6">
									<div className="flex items-center gap-2 mb-3">
										{theory.tags?.slice(0, 2).map((tag) => (
											<span key={tag} className="bg-purple-100 text-purple-700 px-2 py-1 rounded-full text-xs font-medium">
												{tag}
											</span>
										))}
									</div>
									
									<h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-purple-600 transition-colors duration-300 line-clamp-2">
										{theory.title}
									</h3>
									
									<p className="text-gray-600 mb-4 line-clamp-3 leading-relaxed">
										{theory.description}
									</p>
									
									<div className="flex items-center justify-between">
										<div className="text-sm text-gray-500">
											{theory.date && new Date(theory.date).toLocaleDateString('en-US', { 
												year: 'numeric', 
												month: 'long', 
												day: 'numeric' 
											})}
										</div>
										<div className="flex items-center text-purple-600 font-medium group-hover:translate-x-1 transition-transform duration-300">
											Learn More
											<svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
												<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
											</svg>
										</div>
									</div>
								</div>
							</Link>
						);
					})}
				</div>
				
				{/* Call to Action */}
				<div className="mt-16 text-center">
					<div className="bg-gradient-to-r from-purple-600 to-indigo-600 rounded-2xl p-8 text-white">
						<h3 className="text-2xl font-bold mb-4">Ready to Start Your Journey?</h3>
						<p className="text-purple-100 mb-6 max-w-2xl mx-auto">
							Understanding these theories helps you make informed decisions about your mental health care. 
							Our therapists are trained in multiple approaches and will work with you to find the best fit.
						</p>
						<Link 
							href="#contact" 
							className="inline-flex items-center bg-white text-purple-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-300"
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


