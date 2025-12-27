/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: [],
    },
    eslint: {
        ignoreDuringBuilds: false,
    },
    typescript: {
        ignoreBuildErrors: false,
    },
};

export default nextConfig;
