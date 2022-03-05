import React, { useEffect, useState } from 'react';
import { imageSource, smallWalletAddress } from '@src/model/wallet';
import Item from '../Item';
import { ContactProps } from './types';

const Contact: React.FC<ContactProps> = ({ contact, onSelected }) => {
	const [image, setImage] = useState<{ uri: string }>();

	useEffect(() => {
		const fetchImage = async () => {
			setImage(await imageSource(contact.address));
		};

		fetchImage();
	}, []);

	return (
		<Item
			onSelected={() => onSelected(contact)}
			firstLine={contact.name}
			secondLine={smallWalletAddress(contact.address)}
			imageSource={image}
		/>
	);
};

export default Contact;
