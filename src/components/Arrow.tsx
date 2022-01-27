import React from 'react';
import { useTheme } from 'react-native-paper';
import { Svg, Path } from 'react-native-svg';

const TextButton = ({ fill, transform }: { fill: string; transform: string }) => {
	const { colors } = useTheme();
	return (
		<Svg width={24} height={23} viewBox="0 0 24 24" fill={fill} transform={transform}>
			<Path
				fill-rule="evenodd"
				clip-rule="evenodd"
				// eslint-disable-next-line max-len
				d="M10.9822 19.6603C11.4723 20.1604 12.2776 20.1604 12.7678 19.6603L17.2858 15.0501C17.6723 14.6556 18.3055 14.6492 18.6999 15.0358C19.0944 15.4224 19.1008 16.0555 18.7142 16.4499L14.1962 21.0602C12.9219 22.3605 10.8281 22.3605 9.55381 21.0602L5.03579 16.4499C4.64922 16.0555 4.65562 15.4224 5.05007 15.0358C5.44452 14.6492 6.07765 14.6556 6.46421 15.0501L10.9822 19.6603Z"
				fill={fill === '' ? '' : colors.primary}
			/>
			<Path
				fill-rule="evenodd"
				clip-rule="evenodd"
				// eslint-disable-next-line max-len
				d="M11.875 22C11.3227 22 10.875 21.5523 10.875 21L10.875 8.5C10.875 7.94771 11.3227 7.5 11.875 7.5C12.4273 7.5 12.875 7.94771 12.875 8.5L12.875 21C12.875 21.5523 12.4273 22 11.875 22ZM11.875 5.875C11.3227 5.875 10.875 5.42728 10.875 4.875L10.875 3.125C10.875 2.57271 11.3227 2.125 11.875 2.125C12.4273 2.125 12.875 2.57271 12.875 3.125L12.875 4.875C12.875 5.42728 12.4273 5.875 11.875 5.875Z"
				fill={fill === '' ? '' : colors.primary}
			/>
		</Svg>
	);
};

export default TextButton;
