import NavBar from "@/components/NavBar";
import Link from "next/link";

export default function AssessmentsPage() {
	const assessments = [
		{
			title: "PHQ-9 (Depression)",
			description: "Nine questions to screen for depressive symptoms and assess severity.",
			icon: "😔",
			color: "from-blue-500 to-indigo-600",
			questions: 9,
			time: "2-3 minutes",
			href: "/assessments/phq-9"
		},
		{
			title: "GAD-7 (Anxiety)",
			description: "Seven questions to screen for generalized anxiety symptoms and assess severity.",
			icon: "😰",
			color: "from-orange-500 to-red-600",
			questions: 7,
			time: "2-3 minutes",
			href: "/assessments/gad-7"
		}
	];

	return (
		<div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-teal-50">
			<NavBar />
			
			{/* Hero Section */}
			<section className="relative overflow-hidden bg-gradient-to-r from-emerald-600 to-teal-600 text-white">
				<div className="absolute inset-0 bg-black/20"></div>
				<div className="relative mx-auto max-w-6xl px-4 py-20">
					<div className="text-center">
						<h1 className="text-5xl md:text-6xl font-bold mb-6">Mental Health Assessments</h1>
						<p className="text-xl md:text-2xl text-emerald-100 max-w-3xl mx-auto leading-relaxed">
							Validated screening tools to help you understand your mental health status
						</p>
						<div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center items-center">
							<div className="bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 text-white text-sm">
								⚡ Instant Results
							</div>
							<div className="bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 text-white text-sm">
								🔒 Private & Secure
							</div>
							<div className="bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 text-white text-sm">
								📊 Evidence-Based
							</div>
						</div>
					</div>
				</div>
				<div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white to-transparent"></div>
			</section>

			{/* Assessments Grid */}
			<section className="mx-auto max-w-7xl px-4 py-16">
				<div className="mb-12 text-center">
					<h2 className="text-3xl font-bold text-gray-900 mb-4">Available Assessments</h2>
					<p className="text-lg text-gray-600 max-w-2xl mx-auto">
						Take these validated screening tools to better understand your mental health. 
						Results are informational and not a diagnosis.
					</p>
				</div>
				
				<div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
					        {assessments.map((assessment) => (
						<Link 
							key={assessment.href} 
							href={assessment.href}
							className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 hover:border-emerald-200"
						>
							{/* Card Header */}
							<div className={`h-48 bg-gradient-to-br ${assessment.color} relative overflow-hidden`}>
								<div className="absolute inset-0 bg-black/20"></div>
								<div className="absolute top-4 left-4">
									<div className="bg-white/20 backdrop-blur-sm rounded-full px-3 py-1 text-white text-sm font-medium">
										Assessment
									</div>
								</div>
								<div className="absolute inset-0 flex items-center justify-center">
									<div className="text-white text-8xl opacity-30">
										{assessment.icon}
									</div>
								</div>
							</div>
							
							{/* Card Content */}
							<div className="p-6">
								<h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-emerald-600 transition-colors duration-300">
									{assessment.title}
								</h3>
								
								<p className="text-gray-600 mb-6 leading-relaxed">
									{assessment.description}
								</p>
								
								<div className="flex items-center justify-between mb-6">
									<div className="flex items-center gap-4 text-sm text-gray-500">
										<div className="flex items-center gap-1">
											<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
												<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
											</svg>
											{assessment.questions} questions
										</div>
										<div className="flex items-center gap-1">
											<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
												<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
											</svg>
											{assessment.time}
										</div>
									</div>
								</div>
								
								<div className="flex items-center text-emerald-600 font-medium group-hover:translate-x-1 transition-transform duration-300">
									Start Assessment
									<svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
										<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
									</svg>
								</div>
							</div>
						</Link>
					))}
				</div>
				
				{/* Important Notice */}
				<div className="mt-16 max-w-4xl mx-auto">
					<div className="bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 rounded-2xl p-8">
						<div className="flex items-start gap-4">
							<div className="text-amber-600 text-2xl">⚠️</div>
							<div>
								<h3 className="text-xl font-bold text-amber-800 mb-3">Important Information</h3>
								<div className="text-amber-700 space-y-2">
									<p>• These assessments are screening tools, not diagnostic instruments</p>
									<p>• Results are for informational purposes only</p>
									<p>• If you&apos;re experiencing severe symptoms, please seek professional help immediately</p>
									<p>• Your responses are private and not stored on our servers</p>
								</div>
							</div>
						</div>
					</div>
				</div>
				
				{/* Call to Action */}
				<div className="mt-16 text-center">
					<div className="bg-gradient-to-r from-emerald-600 to-teal-600 rounded-2xl p-8 text-white">
						<h3 className="text-2xl font-bold mb-4">Need Professional Support?</h3>
						<p className="text-emerald-100 mb-6 max-w-2xl mx-auto">
							If your assessment results indicate you may benefit from professional help, 
							our experienced therapists are here to support you on your mental health journey.
						</p>
						<Link 
							href="#contact" 
							className="inline-flex items-center bg-white text-emerald-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-300"
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


