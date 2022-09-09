import React from 'react';
import View from '@src/components/View/View';
import Box from '../../Box/Box';
import BlankLayout from '../../BlankLayout/BlankLayout';

const Type5: React.FC = () => (
	<View br="xs" style={{ overflow: 'hidden' }}>
		<BlankLayout invert>
			<View pl="s" pr="xl" w="100%" br="xs" pv="xl">

				<View h={40} row mb="m">
					<Box round={40} />
					<View mr="xxs" />
					<Box h={40} br="xs" flex1 />
				</View>

				<View h={40} row mb="m">
					<Box round={40} />
					<View mr="xxs" />
					<Box h={40} br="xs" flex1 />
				</View>

				<View h={40} row>
					<Box round={40} />
					<View mr="xxs" />
					<Box h={40} br="xs" flex1 />
				</View>

			</View>
		</BlankLayout>
	</View>
);

export default Type5;
