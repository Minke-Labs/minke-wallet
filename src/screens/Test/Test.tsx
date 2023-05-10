/* eslint-disable max-len */
import React from 'react';

import { ConnectedWebView } from '@components';
import { BasicLayout } from '@layouts';

const Test = () => {
	const uri = 'http://192.168.1.127:3000/widget/BRL/0xc2132D05D31c914a87C6611C10748AEb04B58e8F?fiatAmount=0.5';

	return (
		<BasicLayout>
			<ConnectedWebView uri={uri} />
		</BasicLayout>
	);
};

export default Test;
