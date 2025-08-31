import bundleAnalyzer from '@next/bundle-analyzer'
import { codeInspectorPlugin } from 'code-inspector-plugin'
import { withContentlayer } from 'next-contentlayer2'
import withRspack from 'next-rspack'

const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
})

// You might need to insert additional domains in script-src if you are using external services
const ContentSecurityPolicy = `
      default-src 'self';
      script-src 'self' 'unsafe-eval' 'unsafe-inline' giscus.app cloud.umami.is;
      style-src 'self' 'unsafe-inline';
      img-src * blob: data:;
      media-src *.s3.amazonaws.com;
      connect-src *;
      font-src 'self';
      frame-src giscus.app
    `

const securityHeaders = [
  {
    key: 'Content-Security-Policy',
    value: ContentSecurityPolicy.replace(/\n/g, ''),
  },
  {
    key: 'Referrer-Policy',
    value: 'strict-origin-when-cross-origin',
  },
  {
    key: 'X-Frame-Options',
    value: 'DENY',
  },
  {
    key: 'X-Content-Type-Options',
    value: 'nosniff',
  },
  {
    key: 'X-DNS-Prefetch-Control',
    value: 'on',
  },
  {
    key: 'Strict-Transport-Security',
    value: 'max-age=31536000; includeSubDomains',
  },
  {
    key: 'Permissions-Policy',
    value: 'camera=(), microphone=(), geolocation=()',
  },
]

const output = process.env.EXPORT ? 'export' : undefined
const basePath = process.env.BASE_PATH || undefined
const unoptimized = process.env.UNOPTIMIZED ? true : undefined

const nextConfig = {
  output,
  basePath,
  reactStrictMode: true,
  trailingSlash: false,
  pageExtensions: ['ts', 'tsx', 'js', 'jsx', 'md', 'mdx'],
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'picsum.photos',
      },
    ],
    unoptimized,
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: securityHeaders,
      },
    ]
  },
  webpack: (config, { dev }) => {
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    })

    if (dev) {
      config.plugins.push(codeInspectorPlugin({ bundler: 'webpack', editor: 'code' }))
    }

    return config
  },
  experimental: {
    optimizeCss: true,
    reactCompiler: true,
    browserDebugInfoInTerminal: true,
    clientSegmentCache: true,
    devtoolSegmentExplorer: true,
    optimizeRouterScrolling: true,
  },
}

const plugins = [withContentlayer, withBundleAnalyzer, withRspack]

export default plugins.reduce((acc, next) => next(acc), nextConfig)
