type Feature = {
	icon: React.ReactNode;
	title: string;
	description: string;
};

const Card = ({ icon, title, description }: Feature) => (
	<div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm hover:shadow-md transition-shadow">
		<div className="mb-4 text-cyan-700">{icon}</div>
		<h3 className="text-lg font-semibold tracking-tight text-gray-900">{title}</h3>
		<p className="mt-2 text-sm text-gray-600">{description}</p>
	</div>
);

export default function FeatureCards() {
	const features: Feature[] = [
		{
			icon: (
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
					<path d="M12 2a7 7 0 0 0-7 7v3.586l-.707.707A1 1 0 0 0 5 15h14a1 1 0 0 0 .707-1.707L19 12.586V9a7 7 0 0 0-7-7Z" />
					<path d="M9 19a3 3 0 0 0 6 0H9Z" />
				</svg>
			),
			title: "Feeling worried or depressed",
			description: "If you're feeling heavy, worried, anxious, or down, therapy can help improve wellbeing.",
		},
		{
			icon: (
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
					<path fillRule="evenodd" d="M11.358 3.07a.75.75 0 0 1 1.284 0l8.25 14.25A.75.75 0 0 1 20.25 19.5H3.75a.75.75 0 0 1-.643-1.18l8.25-14.25Z" clipRule="evenodd" />
				</svg>
			),
			title: "Experiencing trauma or PTSD",
			description: "If you have a difficult time managing memories or triggers, we can explore supportive coping strategies.",
		},
		{
			icon: (
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
					<path d="M12 2a10 10 0 1 0 10 10A10.011 10.011 0 0 0 12 2Zm1 15h-2v-2h2Zm0-4h-2V7h2Z" />
				</svg>
			),
			title: "Family or relationship issues",
			description: "If conflicts or communication feel hard, therapy provides tools to reconnect and heal.",
		},
	];

	return (
		<section className="py-12 md:py-16 bg-gray-50">
			<div className="mx-auto max-w-6xl px-4 grid grid-cols-1 md:grid-cols-3 gap-6">
				{features.map((f) => (
					<Card key={f.title} {...f} />
				))}
			</div>
		</section>
	);
}


