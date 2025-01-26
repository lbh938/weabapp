/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      'images.unsplash.com',
      'picsum.photos',
      'images.pexels.com',
      'www.apple.com',
    ],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'picsum.photos',
      },
      {
        protocol: 'https',
        hostname: 'images.pexels.com',
      }
    ]
  },
  async redirects() {
    return [
      {
        source: '/success',
        has: [
          {
            type: 'query',
            key: 'payment_intent',
          },
        ],
        permanent: false,
        destination: '/success',
      },
      {
        source: '/payment-error',
        has: [
          {
            type: 'query',
            key: 'error',
          },
        ],
        permanent: false,
        destination: '/payment-error',
      },
    ];
  },
}

module.exports = nextConfig 