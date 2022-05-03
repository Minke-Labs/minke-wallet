module.exports = ({ cache }) => {
	cache(true);
	return {
		presets: ['babel-preset-expo'],
		plugins: [
			[
				'module:react-native-dotenv',
				{
					envName: 'APP_ENV',
					moduleName: '@env',
					path: '.env',
					blocklist: null,
					allowlist: null,
					blacklist: null, // DEPRECATED
					whitelist: null, // DEPRECATED
					safe: false,
					allowUndefined: true,
					verbose: false
				}
			],
			'inline-dotenv',
			'react-native-reanimated/plugin',
			[
				'module-resolver',
				{
					extensions: ['.js', '.jsx', '.ts', '.tsx', '.android.js', '.android.tsx', '.ios.js', '.ios.tsx'],
					root: ['./src'],
					alias: {
						'@localization': './src/localization',
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
						'@utils': './src/utils',
						'@src': './src'
					}
				}
			]
		]
	};
};
