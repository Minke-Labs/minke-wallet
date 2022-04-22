import React from 'react';
import { View, FlatList } from 'react-native';
import { useTheme } from '@hooks';
import { Transaction } from '@components';
import { makeStyles } from './Body.styles';
import { BodyProps } from './Body.types';

const Body: React.FC<BodyProps> = ({ transactions, renderFooter }) => {
	const { colors } = useTheme();
	const styles = makeStyles(colors);

	return (
		<View style={styles.container}>
			<FlatList
				style={{ marginTop: 24, marginBottom: 24 }}
				data={transactions}
				renderItem={({ item }) => <Transaction transaction={item} />}
				keyExtractor={({ hash }) => hash}
				ListFooterComponent={renderFooter}
			/>
		</View>
	);
};

export default Body;
