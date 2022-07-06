export type AvatarId = 0 | 1 | 2 | 3 | 4;
export type Avatar = {
	id?: AvatarId | null;
	name: string;
	desc?: string;
	image?: any;
	flag?: string;
};
export type AvatarSaved = {
	id: AvatarId | null;
	customImage: any;
};
