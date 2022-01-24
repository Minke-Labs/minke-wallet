module.exports = (api) => {
	api.cache(true);
	return {
		presets: ['babel-preset-expo'],
		plugins: ['inline-dotenv',
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
						'@assets': './assets'
					}
				}
			]
		]
	};
};
