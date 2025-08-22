import Hero from "@/components/Hero";
import FeatureCards from "@/components/FeatureCards";
import Link from "next/link";
import ContactForm from "@/components/ContactForm";

export default function Home() {
  return (
    <div>
      <Hero />
      <FeatureCards />
      <section className="mx-auto max-w-6xl px-4 py-12 md:py-16 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="rounded-xl border border-gray-200 p-6">
          <h3 className="font-semibold">Latest Articles</h3>
          <p className="mt-2 text-sm text-gray-600">Read long-form guidance on wellbeing, coping, and recovery.</p>
          <Link href="/articles" className="mt-4 inline-block text-cyan-700 hover:underline">Browse articles →</Link>
        </div>
        <div className="rounded-xl border border-gray-200 p-6">
          <h3 className="font-semibold">Blog</h3>
          <p className="mt-2 text-sm text-gray-600">Short updates, reflections, and practice news.</p>
          <Link href="/blog" className="mt-4 inline-block text-cyan-700 hover:underline">Visit blog →</Link>
        </div>
        <div className="rounded-xl border border-gray-200 p-6">
          <h3 className="font-semibold">Psychological Theories</h3>
          <p className="mt-2 text-sm text-gray-600">Clear explanations of CBT, ACT, attachment, and more.</p>
          <Link href="/theories" className="mt-4 inline-block text-cyan-700 hover:underline">Explore theories →</Link>
        </div>
      </section>
      <ContactForm />
    </div>
  );
}
