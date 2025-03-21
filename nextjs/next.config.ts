import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      // WordPress API routes (excluding NextAuth)
      {
        source: '/api/:path((?!auth).*)*',
        destination: 'https://lamis-blog.com/wp-json/:path*',
        basePath: false
      }
    ];
  },
  async headers() {
    return [
      // Headers for WordPress API routes
      {
        source: '/api/:path((?!auth).*)*',
        headers: [
          { key: 'Access-Control-Allow-Credentials', value: 'true' },
          { key: 'Access-Control-Allow-Origin', value: '*' },
          { key: 'Access-Control-Allow-Methods', value: 'GET,POST,PUT,DELETE,OPTIONS' },
          { key: 'Access-Control-Allow-Headers', value: 'Authorization, Content-Type' }
        ]
      },
      // Headers for NextAuth routes
      {
        source: '/api/auth/:path*',
        headers: [
          { key: 'Access-Control-Allow-Credentials', value: 'true' },
          { key: 'Access-Control-Allow-Origin', value: 'https://blog-mgmt.vercel.app' },
          { key: 'Access-Control-Allow-Methods', value: 'GET,POST' }
        ]
      }
    ];
  }
};

export default nextConfig;