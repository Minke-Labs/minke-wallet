import React from 'react';
import { View } from 'react-native';
import styles from './ModalBackground.styles';

export const ModalBackground: React.FC = ({ children }) => <View style={styles.container}>{children}</View>;
