/** @type {import('next-sitemap').IConfig} */
const config = {
  siteUrl: 'https://code-blog-2-0.vercel.app', // আপনার ডোমেইন
  generateRobotsTxt: true,                   // robots.txt বানাবে
  sitemapSize: 7000,
  changefreq: 'daily',
  priority: 0.7,
  exclude: ['/login', '/_not-found'],
};

export default config;
