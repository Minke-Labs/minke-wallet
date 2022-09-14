import { useTheme } from '@hooks';
import React from 'react';
import { TextInput } from 'react-native';
import Icon from '@src/components/Icon/Icon';
import View from '@src/components/View/View';
import { spacing } from '@styles';
import { SearchInputProps } from './SearchInput.types';

const SearchInput: React.FC<SearchInputProps> = ({ search, onSearch, placeholder = '', marginBottom = 0 }) => {
	const { colors } = useTheme();
	return (
		<View
			flex1
			row
			main="center"
			cross="center"
			bgc="background2"
			br="l"
			style={{ maxHeight: 40, marginBottom }}
		>
			<Icon
				name="searchStroke"
				style={{ margin: spacing.xs }}
				color="cta1"
				size={20}
			/>
			<TextInput
				style={{
					flex: 1,
					paddingVertical: spacing.xxs,
					paddingRight: spacing.xxs,
					paddingLeft: 0,
					fontFamily: 'Inter_400Regular',
					fontWeight: '400',
					fontSize: 16,
					color: colors.text1
				}}
				underlineColorAndroid="transparent"
				placeholderTextColor={colors.text5}
				value={search}
				onChangeText={(text) => onSearch(text)}
				autoCapitalize="none"
				{...{ placeholder }}
			/>
		</View>
	);
};

export default SearchInput;
