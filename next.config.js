/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
    NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  },
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