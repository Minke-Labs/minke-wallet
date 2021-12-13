import React, { useCallback } from 'react';
import { Image, Text, View, TouchableOpacity } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../../../App';
import WelcomeContainer from '../WelcomeContainer';
import MainText from '../MainText';
import SecondaryText from '../SecondaryText';
import PrimaryButton from '../../../components/PrimaryButton';
import styles from './styles';
import logo from './wallet-created.png';

export default function WalletCreatedScreen({
  navigation
}: NativeStackScreenProps<RootStackParamList>) {
  const backupManually = useCallback(async () => {
    navigation.navigate('Backup');
  }, [navigation]);
  return (
    <WelcomeContainer>
      <Image source={logo} style={{ width: 300 }} />
      <MainText>Wallet created!</MainText>
      <SecondaryText>
        Your keys your coin. Backup your wallet incase of loss.
      </SecondaryText>
      <PrimaryButton onPress={backupManually}>Back up</PrimaryButton>
    </WelcomeContainer>
  );
}
