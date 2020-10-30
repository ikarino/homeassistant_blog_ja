require(`dotenv`).config({
  path: `.env`,
});

const shouldAnalyseBundle = process.env.ANALYSE_BUNDLE;

module.exports = {
  siteMetadata: {
    siteTitle: `Smart Life 99`,
    siteTitleAlt: `Smart Life 99`,
    siteHeadline: `スマートホームやライフハックについての情報を発信します`,
    siteUrl: `https://smartlife99.netlify.app/`,
    siteDescription: `自身の経験をもとにスマートホームやライフハックに関して得た情報を発信します`,
    siteLanguage: `ja`,
    siteImage: `/banner.jpg`,
    author: `@ikarino99`,
  },
  plugins: [
    {
      resolve: `@lekoarts/gatsby-theme-minimal-blog`,
      // See the theme's README for all available options
      options: {
        navigation: [
          {
            title: `Blog`,
            slug: `/blog`,
          },
          {
            title: `About`,
            slug: `/about`,
          },
        ],
        externalLinks: [
          {
            name: `Twitter`,
            url: `https://twitter.com/ikarino99`,
          },
          // {
          //   name: `Instagram`,
          //   url: `https://www.instagram.com/lekoarts.de/`,
          // },
        ],
        formatString: `YYYY.MM.DD`
      },
    },
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: process.env.GOOGLE_ANALYTICS_ID,
      },
    },
    `gatsby-plugin-sitemap`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Smart Life 99`,
        short_name: `Smart Life 99`,
        description: `自身の経験をもとにスマートホームやライフハックに関して得た情報を発信します`,
        start_url: `/`,
        background_color: `#fff`,
        theme_color: `#6B46C1`,
        display: `standalone`,
        icons: [
          {
            src: `/android-chrome-192x192.png`,
            sizes: `192x192`,
            type: `image/png`,
          },
          {
            src: `/android-chrome-512x512.png`,
            sizes: `512x512`,
            type: `image/png`,
          },
        ],
      },
    },
    `gatsby-plugin-offline`,
    `gatsby-plugin-netlify`,
    shouldAnalyseBundle && {
      resolve: `gatsby-plugin-webpack-bundle-analyser-v2`,
      options: {
        analyzerMode: `static`,
        reportFilename: `_bundle.html`,
        openAnalyzer: false,
      },
    },
  ].filter(Boolean),
};
