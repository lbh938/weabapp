/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      'images.unsplash.com',
      'picsum.photos',
      'images.pexels.com',
      'www.apple.com',
      'vfuwqxhldukstzrwfjjf.supabase.co',
    ],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      }
    ]
  },
  experimental: {
    appDir: true,
    serverActions: true,
  },
  async redirects() {
    return [
      {
        source: '/success',
        has: [
          {
            type: 'query',
            key: 'session_id',
          },
        ],
        permanent: false,
        destination: '/success',
      },
      {
        source: '/cancel',
        permanent: false,
        destination: '/checkout',
      },
    ];
  },
}

module.exports = nextConfig