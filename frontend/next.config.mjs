/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    swcMinify: true,
    images: {
        domains: ["lh3.googleusercontent.com", "ui-avatars.com", "127.0.0.1"],
    },
    async redirects() {
        return [
            {
                source: "/github",
                destination: "https://github.com/steven-tey/precedent",
                permanent: false,
            },
        ];
    },
};

export default nextConfig;
