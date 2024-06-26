/* eslint-disable no-tabs */
import React, { createContext, useMemo, useState, useEffect } from 'react';
import { KrakenJr, DeShark, Mateus, Fugu, WowFish } from '@avatars';
import AsyncStorage from '@react-native-async-storage/async-storage';
import useWalletState from '../../hooks/useWalletState';
import useLanguage from '../../hooks/useLanguage';
import { AvatarSaved, Avatar, AvatarId } from './AvatarContext.types';

export const AvatarContext = createContext<any>(null);

const AvatarProvider: React.FC = ({ children }) => {
	const { accountName } = useWalletState();
	const [savedAvatar, setSavedAvatar] = useState<AvatarSaved>({ id: 0, customImage: null });
	const { language, i18n } = useLanguage();
	const avatars = useMemo(
		(): Avatar[] => [
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
		],
		[language]
	);

	const [currentAvatar, setCurrentAvatar] = useState<Avatar>(avatars[0]);

	useEffect(() => {
		const fetchAvatar = async () => {
			const storedAvatar = await AsyncStorage.getItem('@savedAvatar');
			if (storedAvatar) {
				const parsedAvatar = JSON.parse(storedAvatar);
				if ((parsedAvatar.id || parsedAvatar.customImage) !== null) {
					setSavedAvatar(parsedAvatar);
				}
			}
		};
		fetchAvatar();
	}, []);

	useEffect(() => {
		const getCurrentAvatar = () => {
			if (savedAvatar.id !== null) {
				const chosenAvatar = avatars.find((avt) => avt.id === savedAvatar.id);
				if (chosenAvatar) setCurrentAvatar(chosenAvatar);
			} else {
				const avatarObj = {
					name: accountName,
					image: savedAvatar.customImage
				};
				setCurrentAvatar(avatarObj);
			}
		};
		getCurrentAvatar();
	}, [savedAvatar, language]);

	const handleMinkeAvatarSelect = async (id: AvatarId) => {
		const avatarObj = { id, customImage: null };
		await AsyncStorage.setItem('@savedAvatar', JSON.stringify(avatarObj));
		setSavedAvatar(avatarObj);
	};

	// const pickImage = async () => {
	// 	const result = await ImagePicker.launchImageLibraryAsync({
	// 		mediaTypes: ImagePicker.MediaTypeOptions.Images,
	// 		allowsEditing: true,
	// 		aspect: [4, 4],
	// 		exif: false,
	// 		quality: 0.5
	// 	});

	// 	if (!result.cancelled) return { uri: result.uri };
	// 	return null;
	// };

	// const handleImagePick = async () => {
	// 	const path = await pickImage();
	// 	if (path) {
	// 		const avatarObj = { id: null, customImage: path };
	// eslint-disable-next-line no-tabs
	// 		await AsyncStorage.setItem('@savedAvatar', JSON.stringify(avatarObj));
	// 		setSavedAvatar(avatarObj);
	// 	}
	// };

	const obj = useMemo(
		() => ({
			avatars,
			setMinkeAvatarId: handleMinkeAvatarSelect,
			currentAvatar
			//pickImage: handleImagePick
		}),
		[currentAvatar]
	);

	return <AvatarContext.Provider value={obj}>{children}</AvatarContext.Provider>;
};

export default AvatarProvider;
