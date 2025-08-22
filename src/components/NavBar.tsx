"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import Logo from "./Logo";

const navItems: Array<{ href: string; label: string }> = [
	{ href: "/", label: "Home" },
	{ href: "/articles", label: "Articles" },
	{ href: "/blog", label: "Blog" },
	{ href: "/theories", label: "Theories" },
	{ href: "/assessments", label: "Assessments" },
];

export default function NavBar() {
	const pathname = usePathname();
	const [open, setOpen] = useState<boolean>(false);

	return (
		<>
			<div className="hidden md:block bg-white/90 backdrop-blur border-b border-black/5">
				<div className="mx-auto max-w-6xl px-4 h-10 flex items-center justify-between text-sm text-gray-600">
					<div className="flex items-center gap-6">
						<span>Call us: <span className="font-medium text-cyan-700">03305848914</span></span>
						<span>Email: <span className="font-medium text-cyan-700">mukhtiyarcenter@gmail.com</span></span>
					</div>
					<div className="flex items-center gap-4">
						<a href="#" aria-label="Instagram" className="hover:text-cyan-700">IG</a>
						<a href="#" aria-label="Twitter" className="hover:text-cyan-700">X</a>
					</div>
				</div>
			</div>
			<header className="sticky top-0 z-40 w-full border-b border-black/10 bg-white/80 backdrop-blur supports-[backdrop-filter]:bg-white/60">
				<div className="mx-auto max-w-6xl px-4">
					<div className="flex h-24 items-center justify-between">
						<Link href="/" className="flex items-center gap-3">
							<Logo className="h-10 w-10" />
							<span className="text-xl font-semibold tracking-tight">Mukhtiyar Psychological Center</span>
						</Link>
						<nav className="hidden md:flex items-center gap-10 text-lg">
							{navItems.map((item) => (
								<Link
									key={item.href}
									href={item.href}
									className={`transition-colors hover:text-cyan-700 ${pathname === item.href ? "text-cyan-700" : "text-gray-600"}`}
								>
									{item.label}
								</Link>
							))}
							<Link href="#contact" className="rounded-md bg-cyan-600 px-5 py-2.5 text-white hover:bg-cyan-700">
								Book a consult
							</Link>
						</nav>
						<button
							className="md:hidden inline-flex items-center justify-center rounded-md p-3 text-gray-700 hover:bg-gray-100"
							aria-label="Toggle menu"
							onClick={() => setOpen((prev) => !prev)}
						>
							<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-7">
								<path fillRule="evenodd" d="M3.75 5.25a.75.75 0 0 1 .75-.75h15a.75.75 0 0 1 0 1.5h-15a.75.75 0 0 1-.75-.75Zm0 6a.75.75 0 0 1 .75-.75h15a.75.75 0 0 1 0 1.5h-15a.75.75 0 0 1-.75-.75Zm0 6a.75.75 0 0 1 .75-.75h15a.75.75 0 0 1 0 1.5h-15a.75.75 0 0 1-.75-.75Z" clipRule="evenodd" />
							</svg>
						</button>
					</div>
				</div>
				{open && (
					<div className="border-t border-black/10 bg-white md:hidden">
						<div className="mx-auto max-w-6xl px-4 py-4 flex flex-col gap-3">
							{navItems.map((item) => (
								<Link key={item.href} href={item.href} className="text-gray-700" onClick={() => setOpen(false)}>
									{item.label}
								</Link>
							))}
							<Link href="#contact" className="rounded-md bg-cyan-600 px-4 py-2.5 text-white hover:bg-cyan-700 text-center" onClick={() => setOpen(false)}>
								Book a consult
							</Link>
						</div>
					</div>
				)}
			</header>
			<a href="#contact" className="hidden md:flex fixed right-0 top-1/2 -translate-y-1/2 origin-right -rotate-90 bg-cyan-600 text-white px-4 py-2 rounded-b-md shadow hover:bg-cyan-700">Schedule a Callback</a>
		</>
	);
}


