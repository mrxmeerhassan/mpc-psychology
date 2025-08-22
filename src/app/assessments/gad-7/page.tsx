"use client";

import NavBar from "@/components/NavBar";
import { useMemo, useState } from "react";

const choices = [
	{ label: "Not at all", value: 0 },
	{ label: "Several days", value: 1 },
	{ label: "More than half the days", value: 2 },
	{ label: "Nearly every day", value: 3 },
];

const questions: string[] = [
	"Feeling nervous, anxious, or on edge",
	"Not being able to stop or control worrying",
	"Worrying too much about different things",
	"Trouble relaxing",
	"Being so restless that it is hard to sit still",
	"Becoming easily annoyed or irritable",
	"Feeling afraid as if something awful might happen",
];

export default function GAD7Page() {
	const [answers, setAnswers] = useState<Record<number, number>>({});
	const total = useMemo(
		() => Object.values(answers).reduce((acc, v) => acc + v, 0),
		[answers]
	);
	const severity = useMemo(() => {
		if (total <= 4) return "Minimal";
		if (total <= 9) return "Mild";
		if (total <= 14) return "Moderate";
		return "Severe";
	}, [total]);

	return (
		<div>
			<NavBar />
			<section className="mx-auto max-w-3xl px-4 py-12">
				<h1 className="text-3xl font-semibold">GAD‑7 Anxiety Questionnaire</h1>
				<p className="mt-2 text-gray-600 dark:text-gray-300">Over the last two weeks, how often have you been bothered by the following problems?</p>
				<form className="mt-8 space-y-6">
					{questions.map((q, idx) => (
						<div key={idx} className="rounded-xl border border-gray-200 p-4 dark:border-gray-800">
							<p className="font-medium">{idx + 1}. {q}</p>
							<div className="mt-3 grid grid-cols-2 md:grid-cols-4 gap-2">
								{choices.map((c) => (
									<label key={c.value} className={`flex items-center gap-2 rounded-md border px-3 py-2 cursor-pointer ${answers[idx] === c.value ? "border-emerald-600 bg-emerald-50" : "border-gray-300"}`}>
										<input
											type="radio"
											name={`q${idx}`}
											value={c.value}
											onChange={() => setAnswers((a) => ({ ...a, [idx]: c.value }))}
											className="accent-emerald-600"
										/>
										<span>{c.label}</span>
									</label>
								))}
							</div>
						</div>
					))}
				</form>
				<div className="mt-8 rounded-xl border border-gray-200 p-6 dark:border-gray-800">
					<p className="text-lg">Total score: <span className="font-semibold">{total}</span></p>
					<p className="mt-1 text-sm text-gray-600 dark:text-gray-300">Severity: {severity}</p>
					<p className="mt-2 text-xs text-gray-500">This screening tool is for educational purposes and does not provide a diagnosis. If you&apos;re concerned, please reach out for professional support.</p>
				</div>
			</section>
		</div>
	);
}


