import React from 'react';
import { SafeAreaView, View as RNView } from 'react-native';
import Text from '@src/components/Text/Text';
import Button from '@src/components/Button/Button';
import TextArea from '@src/components/TextArea/TextArea';
import ModalHeader from '@src/components/ModalHeader/ModalHeader';
import LoadingScreen from '@src/components/LoadingScreen/LoadingScreen';
import View from '@src/components/View/View';
import { deviceHeight } from '@styles';
import KeyboardSpacer from 'react-native-keyboard-spacer';
import { useLanguage } from '@hooks';
import RNUxcam from 'react-native-ux-cam';
import { ImportWalletProps } from './ImportWallet.types';
import { useImportWallet } from './useImportWallet.hooks';

const ImportWallet: React.FC<ImportWalletProps> = ({ onImportFinished, onDismiss }) => {
	const { i18n } = useLanguage();
	const { text, setText, importing, onImportWallet } = useImportWallet({
		onImportFinished
	});

	return (
		<SafeAreaView>
			<ModalHeader {...{ onDismiss }} />
			<View ph="s" style={{ minHeight: deviceHeight * 0.3 }}>
				<>
					<View style={{ minHeight: deviceHeight * 0.4 }}>

						<Text
							type="h3"
							weight="extraBold"
							mb="s"
							width="100%"
						>
							{i18n.t('WelcomeScreen.ImportWalletModal.add_wallet')}
						</Text>

						<RNView
							style={{
								width: '100%',
								height: 110,
								marginBottom: 24
							}}
							ref={(view: any) => RNUxcam.occludeSensitiveView(view)}
						>
							<TextArea
								label={i18n.t('WelcomeScreen.ImportWalletModal.seed_or_key')}
								value={text}
								numberOfLines={6}
								onChangeText={(t) => setText(t)}
							/>
						</RNView>
						{importing ? (
							<LoadingScreen title={i18n.t('WelcomeScreen.ImportWalletModal.importing')} />
						) : (
							<Button
								disabled={!text.trim()}
								title={i18n.t('WelcomeScreen.ImportWalletModal.import')}
								onPress={onImportWallet}
								mb="s"
							/>
						)}

					</View>
					<KeyboardSpacer />
				</>
			</View>
		</SafeAreaView>
	);
};

export default ImportWallet;
