import React from 'react';
import View from '@src/components/View/View';
import Box from '../../Box/Box';
import BlankLayout from '../../BlankLayout/BlankLayout';

const Type3: React.FC = () => (
	<BlankLayout br="s">
		<View ph="s" w="100%">

			<View
				row
				w="100%"
				mb="s"
				mt="m"
				main="space-between"
				cross="center"
			>
				<View row>
					<Box w={40} h={40} br="s" mr="s" />
					<Box w={114} h={40} br="xxxl" />
				</View>
				<Box w={48} h={24} br="xxxl" />
			</View>

			{[1, 2, 3, 4, 5].map(() => (
				<View
					row
					w="100%"
					mb="s"
					style={{
						justifyContent: 'flex-start'
					}}
				>
					<Box w={40} h={40} br="s" mr="s" />
					<Box w={154} h={40} br="xxxl" />
				</View>
			))}

		</View>
	</BlankLayout>
);

export default Type3;
