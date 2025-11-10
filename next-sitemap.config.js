/** @type {import('next-sitemap').IConfig} */
const config = {
 siteUrl: 'https://code-blog-2-0.vercel.app',
  generateRobotsTxt: true,
  changefreq: 'daily',
  priority: 0.7,
  sitemapSize: 7000,
   additionalPaths: async (config) => [
    await config.transform(config, '/'), // ✅ add homepage manually
  ],
};

export default config;
