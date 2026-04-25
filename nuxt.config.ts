// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: false },
  modules: ['@nuxtjs/tailwindcss', '@nuxt/icon', '@nuxt/content'],
  css: ['~/assets/css/main.css'],
  app: {
    head: {
      viewport: 'width=device-width, initial-scale=1, maximum-scale=1',
      charset: 'utf-8',
      title: 'Hexn - Free & Independent Search Engine',
      meta: [
        { name: 'description', content: 'Hexn - Free, independent, and open-source search platform. Search the web without tracking, bias, or censorship. Built with privacy and user freedom in mind.' },
        { name: 'keywords', content: 'search engine, privacy, free search, open source, web search, independent search, no tracking' },
        { name: 'author', content: 'Ali HD (ali heydari)' },
        { name: 'robots', content: 'index, follow' },
        { name: 'googlebot', content: 'index, follow' },
        { name: 'theme-color', content: '#3b82f6' },
        { name: 'msapplication-TileColor', content: '#3b82f6' },
        { name: 'apple-mobile-web-app-capable', content: 'yes' },
        { name: 'apple-mobile-web-app-status-bar-style', content: 'default' },
        { name: 'apple-mobile-web-app-title', content: 'Hexn' },
        { name: 'application-name', content: 'Hexn' },
        { name: 'format-detection', content: 'telephone=no' },
        { name: 'mobile-web-app-capable', content: 'yes' },
        { name: 'msapplication-config', content: '/browserconfig.xml' },
        { name: 'msapplication-tap-highlight', content: 'no' },
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'twitter:site', content: '@hexn' },
        { name: 'twitter:creator', content: '@ali_hdii' },
        { name: 'twitter:title', content: 'Hexn - Free & Independent Search Engine' },
        { name: 'twitter:description', content: 'Free, independent, and open-source search platform. Search without tracking or bias.' },
        { name: 'twitter:image', content: 'https://hexn.com/og-image.png' },
        { name: 'og:type', content: 'website' },
        { name: 'og:title', content: 'Hexn - Free & Independent Search Engine' },
        { name: 'og:description', content: 'Free, independent, and open-source search platform. Search without tracking or bias.' },
        { name: 'og:url', content: 'https://hexn.com' },
        { name: 'og:site_name', content: 'Hexn' },
        { name: 'og:image', content: 'https://hexn.com/og-image.png' },
        { name: 'og:image:width', content: '1200' },
        { name: 'og:image:height', content: '630' },
        { name: 'og:locale', content: 'en_US' },
        { name: 'article:author', content: 'Ali HD (ali heydari)' },
        { name: 'article:publisher', content: 'https://hexn.com' },
        { name: 'canonical', content: 'https://hexn.com' }
      ],
      link: [
        { rel: 'canonical', href: 'https://hexn.com' },
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
        { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/favicon-32x32.png' },
        { rel: 'icon', type: 'image/png', sizes: '16x16', href: '/favicon-16x16.png' },
        { rel: 'apple-touch-icon', sizes: '180x180', href: '/apple-touch-icon.png' },
        { rel: 'mask-icon', href: '/safari-pinned-tab.svg', color: '#3b82f6' },
        { rel: 'manifest', href: '/site.webmanifest' }, 
      ],
      script: [
        {
          type: 'application/ld+json',
          innerHTML: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'WebSite',
            name: 'Hexn',
            url: 'https://hexn.com',
            description: 'Free, independent, and open-source search platform. Search without tracking or bias.',
            author: {
              '@type': 'Person',
              name: 'Ali HD (ali heydari)',
              url: 'https://hexn.com',
              sameAs: [
                'https://t.me/lifelongcoder',
                'https://instagram.com/ali.hdii'
              ]
            },
            publisher: {
              '@type': 'Organization',
              name: 'Hexn',
              url: 'https://hexn.com',
              logo: {
                '@type': 'ImageObject',
                url: 'https://hexn.com/logo.png'
              }
            },
            potentialAction: {
              '@type': 'SearchAction',
              target: 'https://hexn.com/search?q={search_term_string}',
              'query-input': 'required name=search_term_string'
            },
            inLanguage: 'en-US',
            isAccessibleForFree: true,
            license: 'https://opensource.org/licenses/MIT'
          })
        }
      ]
    }
  },
  icon: { 
    class: 'icon',
    mode: 'css',
    collections:['fluent','heroicons','ph'],
    cssLayer: 'base'
  },
  content: {
    highlight: {
      theme: 'github-light'
    }
  },
  runtimeConfig: {
    public: {
      siteUrl: 'https://hexn.com',
      creatorName: 'Ali HD (ali heydari)',
      creatorTelegram: 'https://t.me/lifelongcoder',
      creatorInstagram: 'https://instagram.com/ali.hdii'
    }
  }
})