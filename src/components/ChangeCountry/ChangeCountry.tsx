import React, { useState, useEffect } from 'react';
import { useCountry, useLanguage } from '@hooks';
import { deviceHeight, countries } from '@styles';
import View from '@src/components/View/View';
import Text from '@src/components/Text/Text';
import Flag from '@src/components/Flag/Flag';
import Modal from '@src/components/Modal/Modal';
import Touchable from '@src/components/Touchable/Touchable';
import CountrySelector from '@src/components/CountrySelector/CountrySelector';

const isoByCountry = (val: string) => Object.keys(countries).find((key: string) => countries[key] === val);

interface ChangeCountryProps {
	setCountry: (val: any) => void;
}

const ChangeCountry: React.FC<ChangeCountryProps> = ({ setCountry }) => {
	const { country } = useCountry();
	const [isModalVisible, setIsModalvisible] = useState(false);
	const { i18n } = useLanguage();

	useEffect(() => {
		setCountry(country);
	}, [country]);

	return (
		<>
			<View mb="s">
				<View row>
					<Flag name={country} size={40} />
					<View mr="xxs" />
					<View flex1>
						<View mb="xxs">
							<Text type="bMedium" weight="semiBold">
								{i18n.t(`LocationContext.${isoByCountry(country)}.name`)}
							</Text>
							<Text type="bSmall" width={237}>
								{i18n.t('Components.ChangeCountry.select_country')}
							</Text>
						</View>
						<Touchable onPress={() => setIsModalvisible(true)}>
							<Text type="lLarge" color="cta1" weight="semiBold">
								{i18n.t('Components.ChangeCountry.change_country')}
							</Text>
						</Touchable>
					</View>
				</View>
			</View>
			<Modal isVisible={isModalVisible} onDismiss={() => setIsModalvisible(false)}>
				<View ph="xs" h={deviceHeight * 0.6}>
					<CountrySelector onCountrySelected={(() => setIsModalvisible(false))} />
				</View>
			</Modal>
		</>
	);
};

export default ChangeCountry;
