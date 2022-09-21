export type Networks = 'mainnet' | 'matic';

enum Protocols {
	mstable = 'mstable',
	aave = 'aave'
}

type ProtocolGasLimit = {
	[key in Networks]: {
		deposit: {
			[depositProtocol in Protocols]: number;
		};
		withdraw: {
			[protocol in Protocols]: number;
		};
	};
};

type GasLimits = ProtocolGasLimit & {
	send: number;
	exchange: number;
	approval: number;
};

const gasLimits: GasLimits = {
	send: 100000,
	exchange: 700000,
	approval: 100000,
	mainnet: {
		deposit: {
			aave: 400000,
			mstable: 0 // there is no mStable integration on mainnet.
		},
		withdraw: {
			aave: 500000,
			mstable: 0
		}
	},
	matic: {
		deposit: {
			aave: 400000,
			mstable: 700000
		},
		withdraw: {
			aave: 500000,
			mstable: 700000
		}
	}
};

export default gasLimits;
