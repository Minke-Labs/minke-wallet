import React from 'react';
import { View } from 'react-native';
import MaskedView from '@react-native-masked-view/masked-view';
import { getHole } from './Overlay.utils';
import { OverlayProps } from './Overlay.types';
import styles from './Overlay.styles';

const Overlay: React.FC<OverlayProps> = ({ children, type = 0 }) => (
	<View style={styles.container} pointerEvents="none">
		<MaskedView
			style={{ flex: 1 }}
			maskElement={
				<View style={styles.opacity}>
					<View style={[styles.masked, { ...(getHole(type)) }]} />
				</View>
			}
		>
			{children}
		</MaskedView>
	</View>
);

export default Overlay;
