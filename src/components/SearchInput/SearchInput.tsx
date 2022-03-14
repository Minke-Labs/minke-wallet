import { useTheme } from '@hooks';
import React from 'react';
import { View, TextInput } from 'react-native';
import Icon from '../Icon/Icon';
import { makeStyles } from './SearchInput.styles';
import { SearchInputProps } from './SearchInput.types';

const SearchInput: React.FC<SearchInputProps> = ({ search, onSearch }) => {
	const { colors } = useTheme();
	const styles = makeStyles(colors);
	return (
		<View style={styles.container}>
			<Icon name="searchStroke" style={styles.icon} color="cta1" size={20} />
			<TextInput
				style={styles.input}
				underlineColorAndroid="transparent"
				placeholder="Search tokens"
				placeholderTextColor={colors.text5}
				value={search}
				onChangeText={(text) => onSearch(text)}
				autoCapitalize="none"
			/>
		</View>
	);
};

export default SearchInput;
