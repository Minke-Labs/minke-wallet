import React, { useState } from 'react';
import { View, Image } from 'react-native';
import { token as tokenImages, TokenType } from '@styles';
import { whale3Img } from '@images';
import { Svg, Path } from 'react-native-svg';
import { addColorOpacity } from '@helpers/utilities';
import { Network, networks } from '@models/network';
import { TokenProps, ContentProps, TokenImageContentProps } from './Token.types';

const TokenImage: React.FC<TokenImageContentProps> = ({ name, size, tokenColor }) => {
	const dArr = tokenImages[name].slice(1);
	return (
		<Svg width={size} height={size} viewBox="0 0 32 32" fill="none">
			{dArr.map((d, idx) => (
				<Path fillRule="evenodd" clipRule="evenodd" key={d} d={d} fill={idx === 0 ? tokenColor : 'white'} />
			))}
		</Svg>
	);
};

const NetworkImage = ({ network }: { network: Network }) => {
	if (!network) return <></>;

	const formattedName = network.nativeToken.symbol.toLowerCase() as TokenType;
	const tokenColor = tokenImages[formattedName][0];
	return (
		<View style={{ position: 'absolute', width: 16, height: 16, top: -4, left: 0 }}>
			<TokenImage name={formattedName} size={16} tokenColor={tokenColor} />
		</View>
	);
};

const Content: React.FC<ContentProps> = ({ name, size, tokenColor, network }) => {
	const dArr = tokenImages[name].slice(1);
	return (
		<>
			<Svg width={size} height={size} viewBox="0 0 32 32" fill="none">
				{dArr.map((d, idx) => (
					<Path fillRule="evenodd" clipRule="evenodd" key={d} d={d} fill={idx === 0 ? tokenColor : 'white'} />
				))}
			</Svg>
			<NetworkImage network={network} />
		</>
	);
};

const Token: React.FC<TokenProps> = ({ token, size = 96, outline, glow, showNetworkIcon = true }) => {
	const { id = '', symbol = '', chainId } = token || {};
	const network = showNetworkIcon ? Object.values(networks).find((n) => n.chainId === chainId) : undefined;
	const formattedName = symbol!.toLowerCase() as TokenType;
	const [source, setSource] = useState({
		uri: `https://raw.githubusercontent.com/ErikThiart/cryptocurrency-icons/master/128/${id.toLowerCase()}.png`
	});

	if (!formattedName || !tokenImages[formattedName]) {
		return (
			<>
				<Image
					source={source}
					style={{
						width: size,
						height: size,
						borderRadius: size / 2
					}}
					onError={() => setSource(whale3Img)}
				/>
				<NetworkImage network={network} />
			</>
		);
	}

	const tokenColor = tokenImages[formattedName][0];

	if (outline && !glow) {
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
				<Content {...{ size, tokenColor, network }} name={formattedName} />
			</View>
		);
	}

	if (glow && !outline) {
		return (
			<View
				style={{
					alignItems: 'center',
					justifyContent: 'center',
					width: size + 6,
					height: size + 6,
					borderRadius: (size + 6) / 2,
					backgroundColor: addColorOpacity(tokenColor, 0.25)
				}}
			>
				<Content {...{ size, tokenColor, network }} name={formattedName} />
			</View>
		);
	}

	return <Content {...{ size, tokenColor, network }} name={formattedName} />;
};

export default Token;
