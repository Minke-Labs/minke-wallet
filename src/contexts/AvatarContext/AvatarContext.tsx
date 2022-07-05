import React, { createContext, useMemo, useState, useEffect } from 'react';
import { KrakenJr, DeShark, Mateus, Fugu, WowFish } from '@avatars';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as ImagePicker from 'expo-image-picker';
import useWalletState from '../../hooks/useWalletState';
import useLanguage from '../../hooks/useLanguage';

export const AvatarContext = createContext<any>(null);

const AvatarProvider: React.FC = ({ children }) => {
	const { accountName } = useWalletState();
	const { language, i18n } = useLanguage();

	const [avatarType, setAvatarType] = useState<string>('minke');
	const [userAvatarImage, setUserAvatarImage] = useState<any>(null);

	const [minkeAvatarId, setMinkeAvatarId] = useState(0);
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

	const [currentAvatar, setCurrentAvatar] = useState<any>(avatars[0]);

	const handleAvatarType = async (type: string) => {
		await AsyncStorage.setItem('@avatarType', type);
		setAvatarType(type);
	};

	useEffect(() => {
		const fetchAvatar = async () => {
			const storedAvatarId = await AsyncStorage.getItem('@minkeAvatarId');
			if (storedAvatarId) setMinkeAvatarId(Number(storedAvatarId));
			const storedAvatarType = await AsyncStorage.getItem('@avatarType');
			if (storedAvatarType) setAvatarType(storedAvatarType);
			const storedUserAvatarImage = await AsyncStorage.getItem('@userAvatarImage');
			if (storedUserAvatarImage) setAvatarType(storedUserAvatarImage);
		};
		fetchAvatar();
	}, []);

	// ----------------------------------------------------------------------------------------------------
	useEffect(() => {
		const doStuff = () => {
			if (avatarType === 'minke') {
				const chosenAvatar = avatars.find((avt) => avt.id === minkeAvatarId);
				setCurrentAvatar(chosenAvatar);
			} else if (avatarType === 'user') {
				const avatarObj = {
					name: accountName,
					image: userAvatarImage
				};
				setCurrentAvatar(avatarObj);
			}
		};
		doStuff();
	}, [minkeAvatarId, avatarType]);
	// ----------------------------------------------------------------------------------------------------

	useEffect(() => {
		const storeAvatar = async () => {
			await AsyncStorage.setItem('@minkeAvatarId', minkeAvatarId.toString());
		};
		storeAvatar();
	}, [minkeAvatarId]);

	// ----------------------------------------------------------------------------------------------------
	const pickImage = async () => {
		const result = await ImagePicker.launchImageLibraryAsync({
			mediaTypes: ImagePicker.MediaTypeOptions.All,
			allowsEditing: true,
			aspect: [4, 3],
			quality: 1
		});

		if (!result.cancelled) {
			await AsyncStorage.setItem('@userAvatarImage', `${{ uri: result.uri }}`);
			setUserAvatarImage({ uri: result.uri });
			handleAvatarType('user');
		}
	};
	// ----------------------------------------------------------------------------------------------------

	const handleMinkeAvatarSelect = (id: number) => {
		setMinkeAvatarId(id);
		handleAvatarType('minke');
	};

	const obj = useMemo(
		() => ({
			avatars,
			setMinkeAvatarId: handleMinkeAvatarSelect,
			currentAvatar,
			pickImage,
			avatarType
		}),
		[currentAvatar]
	);

	return <AvatarContext.Provider value={obj}>{children}</AvatarContext.Provider>;
};

export default AvatarProvider;
