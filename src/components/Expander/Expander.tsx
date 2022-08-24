import React, { useState } from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Text, Paper, Icon } from '@components';
import { useLanguage } from '@hooks';
import { ExpanderProps } from './Expander.types';
import styles from './Expander.styles';

const lengthConst = 181;

const Expander: React.FC<ExpanderProps> = ({ title, desc }) => {
	const [expanded, setExpanded] = useState(false);
	const { i18n } = useLanguage();

	const trunc = () => {
		if ((desc.length > lengthConst) && !expanded) return `${desc.slice(0, lengthConst)}...`;
		return desc;
	};

	return (
		<Paper p="xs" style={{ width: '100%' }}>
			<Text
				type="tSmall"
				weight="semiBold"
				marginBottom={8}
			>
				{title}
			</Text>
			<Text type="bSmall" color="text4">
				{trunc()}
			</Text>
			{
				desc.length > lengthConst && (
					<View style={styles.expand}>
						<TouchableOpacity
							style={styles.button}
							onPress={() => setExpanded(!expanded)}
						>
							<Text
								type="lSmall"
								weight="semiBold"
								style={{ marginRight: 8 }}
							>
								{expanded ?
									i18n.t('NFTDetailScreen.Expander.show_less') :
									i18n.t('NFTDetailScreen.Expander.show_more')}
							</Text>
							<Icon
								name={expanded ? 'chevronUp' : 'chevronDown'}
								size={20}
								color="cta1"
							/>
						</TouchableOpacity>
					</View>
				)
			}
		</Paper>
	);
};

export default Expander;
