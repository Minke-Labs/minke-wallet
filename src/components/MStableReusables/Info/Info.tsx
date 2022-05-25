import React from 'react';
import { Linking, TouchableOpacity, View } from 'react-native';
import { useLanguage } from '@hooks';
import Icon from '../../Icon/Icon';
import Text from '../../Text/Text';
import TransparentCard from '../../TransparentCard/TransparentCard';

const Info: React.FC<{ marginBottom?: number }> = ({ marginBottom = 0 }) => {
	const { i18n } = useLanguage();
	return (
		<View style={{ marginBottom }}>
			<TransparentCard marginBottom={16}>
				<Text weight="extraBold" marginBottom={12} style={{ width: '100%' }}>
					{i18n.t('Components.MStableReusables.Info.what_is')}
				</Text>
				<Text type="a">
					{i18n.t('Components.MStableReusables.Info.mstable_des')}
				</Text>
			</TransparentCard>
			<View style={{
				flexDirection: 'row',
				justifyContent: 'space-between'
			}}
			>
				<TouchableOpacity onPress={() => Linking.openURL('https://mstable.org/')}>
					<TransparentCard row padding={16}>
						<Icon name="siteStroke" color="cta1" size={24} style={{ marginRight: 8 }} />
						<Text type="a" color="text2">
							{i18n.t('Components.MStableReusables.Info.view_site')}
						</Text>
						<Icon name="chevronRight" color="cta1" size={24} />
					</TransparentCard>
				</TouchableOpacity>

				<TouchableOpacity onPress={() => Linking.openURL('https://docs.mstable.org/')}>
					<TransparentCard row padding={16}>
						<Icon name="learnStroke" color="cta1" size={24} style={{ marginRight: 8 }} />
						<Text type="a" color="text2">
							{i18n.t('Components.MStableReusables.Info.learn_more')}
						</Text>
						<Icon name="chevronRight" color="cta1" size={24} />
					</TransparentCard>
				</TouchableOpacity>
			</View>
		</View>
	);
};

export default Info;
