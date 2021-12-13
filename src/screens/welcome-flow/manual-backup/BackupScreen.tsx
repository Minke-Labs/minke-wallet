import React, { useCallback } from 'react';
import { Text } from 'react-native';
import WelcomeContainer from '../WelcomeContainer';
import { globalWalletState } from '../../../stores/WalletStore';
import { useState } from '@hookstate/core';
import AppLoading from 'expo-app-loading';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../../../App';
import { getSeedPhrase } from '../../../model/wallet';
import { Headline, Subheading, List } from 'react-native-paper';

export function BackupScreen({ navigation }: NativeStackScreenProps<RootStackParamList>) {
  const walletState = useState(globalWalletState());
  const onFinish = useCallback(() => navigation.navigate('Wallet'), [navigation]);

  const loadSeed = getSeedPhrase(walletState.value.walletId || '');
  const seed = useState(loadSeed);
  if (seed.promised) return <AppLoading />;
  return (
    <WelcomeContainer>
      <Headline>Recovery phrase</Headline>
      <Subheading>
        Write this down on paper or save it in your password manager.
      </Subheading>

      {seed.value?.split(' ').map((word, index) => {
        return (
          <Text key={word}>
            {index + 1} - {word}
          </Text>
        );
      })}
    </WelcomeContainer>
  );
}
