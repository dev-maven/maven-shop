const nextConfig = {
	reactStrictMode: true,
	images: {
		domains: ['localhost', 'maven-shop-api.herokuapp.com', 'i.pinimg.com'],
	},
	env: {
		apiUrl: 'https://maven-shop-api.herokuapp.com',
	},
};

module.exports = nextConfig;
