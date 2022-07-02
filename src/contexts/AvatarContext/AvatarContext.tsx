import React, { createContext, useMemo, useState } from 'react';
import { KrakenJr, DeShark, Mateus, Fugu, WowFish } from '@avatars';

export const AvatarContext = createContext<any>(null);

const avatarArray = [
	{
		name: 'Kraken Jr.',
		desc: 'Friendly Octopus from the US that is constantly chasing new coins. ',
		image: KrakenJr,
		flag: 'unitedStates'
	},
	{
		name: 'DeShark',
		desc: 'The Australian shark that loves navigating the waters of DeFi.',
		image: DeShark,
		flag: 'australia'
	},
	{
		name: 'Mateus',
		desc: 'Bright Brazilian anglerfish saving on stablecoins. ',
		image: Mateus,
		flag: 'brazil'
	},
	{
		name: 'Fugu',
		desc: 'Blowfish from Japan new to crypto but constantly learning. ',
		image: Fugu,
		flag: 'japan'
	},
	{
		name: 'Wow fish',
		desc: 'German goldfish looking for sustainable yields. ',
		image: WowFish,
		flag: 'germany'
	}
];

const AvatarProvider: React.FC = ({ children }) => {
	const [currentAvatar, setCurrentAvatar] = useState<any>(avatarArray[1]);
	const [avatarId, setAvatarId] = useState<number>(0);

	const obj = useMemo(
		() => ({
			avatarArray,
			currentAvatar,
			setCurrentAvatar,
			avatarId,
			setAvatarId
		}),
		[]
	);

	return <AvatarContext.Provider value={obj}>{children}</AvatarContext.Provider>;
};

export default AvatarProvider;
