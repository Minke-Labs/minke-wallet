import React, { createContext, useMemo, useState, useEffect } from 'react';
import { KrakenJr, DeShark, Mateus, Fugu, WowFish } from '@avatars';
import AsyncStorage from '@react-native-async-storage/async-storage';
import useLanguage from '../../hooks/useLanguage';

export const AvatarContext = createContext<any>(null);

const AvatarProvider: React.FC = ({ children }) => {
	const { language, i18n } = useLanguage();
	const [avatarId, setAvatarId] = useState(0);
	const avatars = useMemo(() => [
		{
			id: 0,
			name: i18n.t('AvatarContext.KrakenJr.name'),
			desc: i18n.t('AvatarContext.KrakenJr.desc'),
			image: KrakenJr,
			flag: 'unitedStates'
		},
		{
			id: 1,
			name: i18n.t('AvatarContext.DeShark.name'),
			desc: i18n.t('AvatarContext.DeShark.desc'),
			image: DeShark,
			flag: 'australia'
		},
		{
			id: 2,
			name: i18n.t('AvatarContext.Mateus.name'),
			desc: i18n.t('AvatarContext.Mateus.desc'),
			image: Mateus,
			flag: 'brazil'
		},
		{
			id: 3,
			name: i18n.t('AvatarContext.Fugu.name'),
			desc: i18n.t('AvatarContext.Fugu.desc'),
			image: Fugu,
			flag: 'japan'
		},
		{
			id: 4,
			name: i18n.t('AvatarContext.WowFish.name'),
			desc: i18n.t('AvatarContext.WowFish.desc'),
			image: WowFish,
			flag: 'germany'
		}
	], [language]);

	const currentAvatar = useMemo(
		() => avatars.find((avatar) => avatar.id === avatarId),
		[avatars, avatarId]
	);

	useEffect(() => {
		const fetchAvatar = async () => {
			const storedAvatarId = await AsyncStorage.getItem('@avatarId');
			setAvatarId(Number(storedAvatarId));
		};
		fetchAvatar();
	}, []);

	useEffect(() => {
		const storeAvatar = async () => {
			await AsyncStorage.setItem('@avatarId', avatarId.toString());
		};
		storeAvatar();
	}, [avatarId]);

	const obj = useMemo(
		() => ({
			avatars,
			setAvatarId,
			currentAvatar
		}),
		[currentAvatar]
	);

	return <AvatarContext.Provider value={obj}>{children}</AvatarContext.Provider>;
};

export default AvatarProvider;
