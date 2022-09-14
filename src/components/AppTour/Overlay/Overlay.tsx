import React from 'react';
import View from '@src/components/View/View';
import MaskedView from '@react-native-masked-view/masked-view';
import { getHole } from './Overlay.utils';
import { AppTourStepType } from '../AppTour.types';

export interface OverlayProps {
	type: AppTourStepType;
}

const Overlay: React.FC<OverlayProps> = ({ children, type = 0 }) => (
	<View
		w="100%"
		h="100%"
		style={{
			position: 'absolute',
			top: 0,
			backgroundColor: '#000000'
		}}
		pointerEvents="none"
	>
		<MaskedView
			androidRenderingMode="software"
			style={{ flex: 1 }}
			maskElement={
				<View flex1 style={{ backgroundColor: '#00000060' }}>
					<View
						bgc="text11"
						style={{ ...(getHole(type)), position: 'absolute' }}
					/>
				</View>
			}
		>
			{children}
		</MaskedView>
	</View>
);

export default Overlay;
