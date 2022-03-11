module.exports = (api) => {
	api.cache(true);
	return {
		presets: ['babel-preset-expo'],
		plugins: [
			'inline-dotenv',
			'react-native-reanimated/plugin',
			[
				'module-resolver',
				{
					extensions: ['.js', '.jsx', '.ts', '.tsx', '.android.js', '.android.tsx', '.ios.js', '.ios.tsx'],
					root: ['./src'],
					alias: {
						'@components': './src/components',
						'@helpers': './src/helpers',
						'@stores': './src/stores',
						'@models': './src/model',
						'@assets': './assets',
						'@styles': './src/styles',
						'@containers': './src/containers',
						'@screens': './src/screens',
						'@contexts': './src/contexts',
						'@routes': './src/routes',
						'@layouts': './src/layouts',
						'@images': './src/images',
						'@hooks': './src/hooks',
						'@src': './src'
					}
				}
			]
		]
	};
};
