const nextConfig = {
	reactStrictMode: true,
	images: {
		domains: ['sangw.in', 'localhost', 'picsum.photos', 'i.pinimg.com'],
	},
	env: {
		apiUrl:
			process.env.NODE_ENV === 'production'
				? 'testuser.com/api'
				: 'http://localhost:8080',
	},
};

module.exports = nextConfig;
