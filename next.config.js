/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    env: {
        GITHUB_TOKEN: process.env.GITHUB_TOKEN,
    }
}

module.exports = nextConfig