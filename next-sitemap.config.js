/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || 'https://maharanijewellers.com',
  generateRobotsTxt: true,
  generateIndexSitemap: false,
  changefreq: 'weekly',
  transform: async (config, path) => {
    let priority = 0.5;

    if (path === '/') {
      priority = 1.0;
    } else if (path.startsWith('/collections') || path.includes('-dhanbad')) {
      priority = 0.8;
    } else if (path.startsWith('/product')) {
      priority = 0.7;
    }

    return {
      loc: path,
      changefreq: config.changefreq,
      priority: priority,
      lastmod: config.autoLastmod ? new Date().toISOString() : undefined,
      alternateRefs: config.alternateRefs ?? [],
    };
  },
};
