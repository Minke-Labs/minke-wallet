import React, { useCallback } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import WelcomeContainer from '../WelcomeContainer';
import { globalWalletState } from '../../../stores/WalletStore';
import { useState } from '@hookstate/core';
import AppLoading from 'expo-app-loading';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../../../App';
import { getSeedPhrase } from '../../../model/wallet';
import { Headline, Subheading, List, Icon } from 'react-native-paper';
import styles from './styles';

export function BackupScreen({ navigation }: NativeStackScreenProps<RootStackParamList>) {
  const walletState = useState(globalWalletState());
  const onFinish = useCallback(() => navigation.navigate('Wallet'), [navigation]);

  const loadSeed = getSeedPhrase(walletState.value.walletId || '');
  const seed = useState(loadSeed);
  if (seed.promised) return <AppLoading />;
  return (
    <View style={styles.container}>
      <Headline style={styles.headline}>
        Recovery phrase
      </Headline>
      <Subheading style={styles.subheading}>
        Write this down on paper or save it in your password manager.
      </Subheading>

      <View style={styles.backupWordContainer}>
        {seed.value?.split(' ').map((word, index) => {
          return (
            <Text key={word} style={styles.backupWordItem}>
              <View style={styles.backupWordNumberPadding}>
                <Text style={styles.backupWordNumber}>{index + 1}</Text>
              </View>
              <View style={styles.backupWordPadding}>
                <Text style={styles.backupWord}>{word}</Text>
              </View>
            </Text>
          );
        })}
      </View>

      <TouchableOpacity style={styles.copyPastButton}>
        <Text>
          Copy to clipboard
        </Text>
      </TouchableOpacity>

    </View>
  );
}
