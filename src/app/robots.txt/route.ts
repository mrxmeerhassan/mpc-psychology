

export async function GET() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://mpc-psychology.com';
  
  const robotsTxt = `# MPC Psychology Center Robots.txt
User-agent: *
Allow: /

# Sitemap
Sitemap: ${baseUrl}/sitemap.xml

# Disallow admin areas
Disallow: /admin/
Disallow: /api/

# Allow important pages
Allow: /articles/
Allow: /blog/
Allow: /theories/
Allow: /assessments/

# Crawl delay (optional)
Crawl-delay: 1
`;

  return new Response(robotsTxt, {
    headers: {
      'Content-Type': 'text/plain',
    },
  });
}


