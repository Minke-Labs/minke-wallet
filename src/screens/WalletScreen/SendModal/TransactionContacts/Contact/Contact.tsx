import React, { useEffect, useState } from 'react';
import { ContactItem } from '@src/model/contact';
import { imageSource, smallWalletAddress } from '@src/model/wallet';
import Item from '../Item';

const Contact = ({ contact, onSelected }: { contact: ContactItem; onSelected: (coin: ContactItem) => void }) => {
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
