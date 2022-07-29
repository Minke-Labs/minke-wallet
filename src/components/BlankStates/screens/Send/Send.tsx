import React from 'react';
import { View } from 'react-native';
import Box from '../../Box/Box';
import BlankLayout from '../../BlankLayout/BlankLayout';

const Send: React.FC = () => (
	<BlankLayout br={20}>
		<View style={{ paddingHorizontal: 24, width: '100%' }}>
			<View
				style={{
					flexDirection: 'row',
					width: '100%',
					justifyContent: 'space-between',
					alignItems: 'center',
					marginBottom: 24,
					marginTop: 32
				}}
			>
				<View style={{ flexDirection: 'row' }}>
					<Box w={40} h={40} br={20} style={{ marginRight: 22 }} />
					<Box w={114} h={40} br={64} />
				</View>
				<Box w={48} h={24} br={64} />
			</View>

			{
				[1, 2, 3, 4, 5].map(() => (
					<View
						style={{
							flexDirection: 'row',
							width: '100%',
							justifyContent: 'flex-start',
							marginBottom: 24
						}}
					>
						<Box w={40} h={40} br={20} style={{ marginRight: 22 }} />
						<Box w={154} h={40} br={64} />
					</View>
				))
			}

		</View>
	</BlankLayout>
);

export default Send;
