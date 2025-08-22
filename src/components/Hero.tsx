"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";

export default function Hero() {
	const [currentImage, setCurrentImage] = useState(0);
	const images = [
		{ src: "/freud.jpg", alt: "Sigmund Freud - Father of Psychology" },
		{ src: "/web.png", alt: "MPC Psychology Center Logo" }
	];

	useEffect(() => {
		const interval = setInterval(() => {
			setCurrentImage((prev) => (prev + 1) % images.length);
		}, 2000);

		return () => clearInterval(interval);
	}, [images.length]);

	return (
		<section className="relative overflow-hidden">
			<div className="mx-auto max-w-6xl px-4 py-16 md:py-24 grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
				<div>
					<div className="rounded-2xl bg-white/80 backdrop-blur border border-gray-100 p-6 shadow-sm">
						<h1 className="text-4xl md:text-5xl font-semibold tracking-tight text-gray-900">Mukhtiyar Psychological Center (MPC)</h1>
						<p className="mt-4 text-gray-700 leading-relaxed">
							Compassionate, evidence‑based psychotherapy. MPC offers online sessions and resources to help you regain balance and reduce suffering.
						</p>
						<div className="mt-6 flex flex-wrap items-center gap-4">
							<Link href="#contact" className="rounded-md bg-cyan-600 px-5 py-3 text-white hover:bg-cyan-700">Book a consult</Link>
							<Link href="/assessments" className="rounded-md border border-cyan-200 px-5 py-3 text-cyan-700 hover:bg-cyan-50">Take a questionnaire</Link>
						</div>
					</div>
				</div>
				<div className="relative aspect-[4/3] md:aspect-auto md:h-[420px] rounded-xl overflow-hidden bg-gradient-to-br from-cyan-50 to-white" style={{ WebkitMaskImage: "radial-gradient(ellipse at center, black 85%, transparent 100%)", maskImage: "radial-gradient(ellipse at center, black 85%, transparent 100%)" }}>
					{images.map((image, index) => (
						<div
							key={index}
							className={`absolute inset-0 transition-opacity duration-1000 ${
								index === currentImage ? "opacity-100" : "opacity-0"
							}`}
						>
							{image.src.endsWith('.svg') ? (
								<div className="w-full h-full flex items-center justify-center bg-white">
									<Image
										src={image.src}
										alt={image.alt}
										width={400}
										height={200}
										className="max-w-full max-h-full object-contain"
									/>
								</div>
							) : (
								<Image
									src={image.src}
									alt={image.alt}
									fill
									className="object-cover"
									priority={index === 0}
								/>
							)}
							<div className="absolute inset-0 bg-gradient-to-r from-white/60 via-transparent to-white/60" />
						</div>
					))}
					
					{/* Image indicators */}
					<div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
						{images.map((_, index) => (
							<button
								key={index}
								onClick={() => setCurrentImage(index)}
								className={`w-3 h-3 rounded-full transition-colors duration-300 ${
									index === currentImage ? "bg-white" : "bg-white/50"
								}`}
								aria-label={`Go to image ${index + 1}`}
							/>
						))}
					</div>
				</div>
			</div>
		</section>
	);
}


