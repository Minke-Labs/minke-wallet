import { useTheme } from '@hooks';
import React from 'react';
import { View } from 'react-native';
import BasicLayout from '../BasicLayout/BasicLayout';
import { Background } from './Background/Background';
import BorderSVG from './BorderSVG';
import { makeStyles } from './SaveLayout.styles';

const SaveLayout: React.FC = ({ children }) => {
	const { colors } = useTheme();
	const styles = makeStyles(colors);
	return (
		<BasicLayout>
			<Background>
				<View style={styles.container}>
					<View style={styles.imgContainer}>
						<BorderSVG />
					</View>
					<View style={styles.content}>{children}</View>
				</View>
			</Background>
		</BasicLayout>
	);
};

export default SaveLayout;
