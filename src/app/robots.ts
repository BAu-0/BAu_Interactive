import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://bauinteractive.com';

  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/admin', '/private'],
      },
      {
        userAgent: [
          'GPTBot',
          'ChatGPT-User',
          'ClaudeBot',
          'Claude-Web',
          'Google-Extended',
          'PerplexityBot',
          'Applebot-Extended',
          'Amazonbot',
          'CCBot',
          'cohere-ai',
        ],
        allow: ['/', '/llms.txt', '/llms-full.txt', '/api/mcp'],
        disallow: ['/admin', '/private'],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
