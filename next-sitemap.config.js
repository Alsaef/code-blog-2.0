/** @type {import('next-sitemap').IConfig} */
const config = {
  siteUrl: 'https://code-blog-2-0.vercel.app', 
  generateRobotsTxt: true,                   
  sitemapSize: 7000,
  changefreq: 'daily',
  priority: 0.7,
  exclude: ['/_not-found'],
};

export default config;
