import React from 'react';
import { View } from 'react-native';
import { token } from '@styles';
import { Svg, Path } from 'react-native-svg';
import { TokenProps, ContentProps } from './Token.types';

const Content: React.FC<ContentProps> = ({ name, size, tokenColor }) => {
	const dArr = token[name].slice(1);
	return (
		<Svg
			width={size}
			height={size}
			viewBox="0 0 32 32"
			fill="none"
		>
			{dArr.map((d, idx) => (
				<Path key={d} d={d} fill={idx === 0 ? tokenColor : 'white'} />
			))}
		</Svg>
	);
};

const Token: React.FC<Partial<TokenProps>> = ({ name = 'aave', size = 96, outline }) => {
	const tokenColor = token[name][0];

	if (outline) {
		return (
			<View
				style={{
					alignItems: 'center',
					justifyContent: 'center',
					width: size + 6,
					height: size + 6,
					borderRadius: (size + 6) / 2,
					borderWidth: 1,
					borderColor: tokenColor
				}}
			>
				<Content {...{ name, size, tokenColor }} />
			</View>
		);
	}

	return <Content {...{ name, size, tokenColor }} />;
};

export default Token;
