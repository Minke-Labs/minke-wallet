import React, { useState } from 'react';
import { TouchableOpacity } from 'react-native';
import { useLanguage } from '@hooks';
import Text from '../Text/Text';
import Paper from '../Paper/Paper';
import Icon from '../Icon/Icon';
import View from '../View/View';
import { ExpanderProps } from './Expander.types';

const lengthConst = 181;

const Expander: React.FC<ExpanderProps> = ({ title, desc }) => {
	const [expanded, setExpanded] = useState(false);
	const { i18n } = useLanguage();

	const trunc = () => {
		if ((desc.length > lengthConst) && !expanded) return `${desc.slice(0, lengthConst)}...`;
		return desc;
	};

	return (
		<Paper p="xs">
			<Text type="tSmall" weight="semiBold" mb="xxs">
				{title}
			</Text>
			<Text type="bSmall" color="text4">
				{trunc()}
			</Text>
			{desc.length > lengthConst && (
				<View h={38} row main="flex-end" cross="center">
					<TouchableOpacity onPress={() => setExpanded(!expanded)}>
						<View row cross="center">
							<Text type="lSmall" weight="semiBold">
								{expanded ?
									i18n.t('NFTDetailScreen.Expander.show_less') :
									i18n.t('NFTDetailScreen.Expander.show_more')}
							</Text>
							<View mr="xxxs" />
							<Icon
								name={expanded ? 'chevronUp' : 'chevronDown'}
								size={20}
								color="cta1"
							/>
						</View>
					</TouchableOpacity>
				</View>
			)}
		</Paper>
	);
};

export default Expander;
