/* eslint-disable max-len */
import React from 'react';

import { ConnectedWebView } from '@components';
import { BasicLayout } from '@layouts';

const Test = () => {
	const uri =
		'https://1447-2001-8a0-72b6-1d00-cc03-1d7f-a2dd-750c.ngrok-free.app/widget/BRL/0xc2132D05D31c914a87C6611C10748AEb04B58e8F?fiatAmount=100';

	return (
		<BasicLayout>
			<ConnectedWebView uri={uri} />
		</BasicLayout>
	);
};

export default Test;
