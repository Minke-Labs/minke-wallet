import React, { useState } from 'react';
import { ScrollView, SafeAreaView } from 'react-native';
import { BasicLayout } from '@layouts';
import { View, Modal, ModalReusables, ModalBase } from '@components';
import { Selector } from './Selector/Selector';
import { Stories } from './Stories/Stories';
import { Accounts } from './Accounts/Accounts';
import { Assets } from './Assets/Assets';
import Header from './Header/Header';
import AvatarModal from './AvatarModal/AvatarModal';

const HomeScreen = () => {
	const [visible, setVisible] = useState(false);
	const [openAvatarModal, setOpenAvatarModal] = useState(false);

	return (
		<>
			<BasicLayout>
				<SafeAreaView />
				<ScrollView showsVerticalScrollIndicator={false}>
					<View ph={3}>
						<Header />
						<Assets setOpenAvatarModal={() => setOpenAvatarModal(true)} />
						<Accounts />
						<Stories />
					</View>
				</ScrollView>
				<Selector onActionPressed={() => setVisible(true)} />
			</BasicLayout>
			<Modal isVisible={visible} onDismiss={() => setVisible(false)}>
				<ModalReusables.Actions />
			</Modal>
			<ModalBase isVisible={openAvatarModal} onDismiss={() => setOpenAvatarModal(false)}>
				{openAvatarModal && (
					<AvatarModal onDismiss={() => setOpenAvatarModal(false)} />
				)}
			</ModalBase>
		</>
	);
};

export default HomeScreen;
