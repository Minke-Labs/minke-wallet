import React, { useState } from 'react';
import { ScrollView, SafeAreaView } from 'react-native';
import { BasicLayout } from '@layouts';
import { View, Modal, ModalReusables } from '@components';
import { Selector } from './Selector/Selector';
import { Stories } from './Stories/Stories';
import { Accounts } from './Accounts/Accounts';
import { Assets } from './Assets/Assets';
import Header from './Header/Header';

const HomeScreen = () => {
	const [visible, setVisible] = useState(false);
	return (
		<>
			<BasicLayout>
				<SafeAreaView />
				<ScrollView showsVerticalScrollIndicator={false}>
					<View ph={3}>
						<Header />
						<Assets />
						<Accounts />
						<Stories />
					</View>
				</ScrollView>
				<Selector onActionPressed={() => setVisible(true)} />
			</BasicLayout>
			<Modal isVisible={visible} onDismiss={() => setVisible(false)}>
				<ModalReusables.Actions />
			</Modal>
		</>
	);
};

export default HomeScreen;
