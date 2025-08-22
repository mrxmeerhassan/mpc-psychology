import { readAllContent } from "@/lib/mdx";
import Link from "next/link";

export default async function ArticlesPage() {
  const articles = readAllContent("articles");

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-cyan-50 to-blue-50 py-16 md:py-24">
        <div className="mx-auto max-w-6xl px-4">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Psychology Articles
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Evidence-based articles on mental health, therapy approaches, and psychological insights to support your well-being journey.
            </p>
          </div>
        </div>
      </section>

      {/* Articles Grid */}
      <section className="mx-auto max-w-6xl px-4 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {articles.map((article) => (
            <article key={article.slug} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
              <div className="p-6">
                <div className="flex items-center gap-2 mb-3">
                  {article.tags?.slice(0, 2).map((tag) => (
                    <span key={tag} className="px-2 py-1 text-xs font-medium bg-cyan-100 text-cyan-800 rounded-full">
                      {tag}
                    </span>
                  ))}
                </div>
                <h2 className="text-xl font-semibold text-gray-900 mb-3 line-clamp-2">
                  {article.title}
                </h2>
                <p className="text-gray-600 mb-4 line-clamp-3">
                  {article.description}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">
                    {article.date && new Date(article.date).toLocaleDateString()}
                  </span>
                  <Link 
                    href={`/articles/${article.slug}`}
                    className="text-cyan-700 hover:text-cyan-800 font-medium text-sm"
                  >
                    Read more →
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-gradient-to-r from-cyan-600 to-blue-600 text-white py-16">
        <div className="mx-auto max-w-4xl px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Start Your Journey?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Our experienced therapists are here to help you overcome challenges and achieve better mental health.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/contact"
              className="bg-white text-cyan-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              Book Free Consultation
            </Link>
            <Link 
              href="/theories"
              className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-cyan-600 transition-colors"
            >
              Learn About Therapy
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}


