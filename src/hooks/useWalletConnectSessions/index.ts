import AsyncStorage from '@react-native-async-storage/async-storage';
import WalletConnect from '@walletconnect/client';
import { parseWalletConnectUri } from '@walletconnect/utils';
import { pickBy } from 'lodash';
import { CallbackParams, HandleApprovalParams, Meta, WalletConnectSession } from './types';

const connectionsStorageKey = '@walletConnectSessions';
const urisStorageKey = '@walletConnectUris';

const clientMeta = {
	description: 'Wave hello to stable money. 🌊',
	icons: ['https://avatars2.githubusercontent.com/u/90388553?s=200&v=4'],
	name: 'Minke',
	ssl: true,
	url: 'https://minke.app'
};

const useWalletConnectSessions = () => {
	const getAllWalletConnectSessions = async (): Promise<WalletConnectSession> => {
		const rawSessions = (await AsyncStorage.getItem(connectionsStorageKey)) || '{}';
		return JSON.parse(rawSessions);
	};

	const getAllValidWalletConnectSessions = async () => {
		const allSessions = await getAllWalletConnectSessions();
		return pickBy(allSessions, (value) => value.connected);
	};

	const saveWalletConnectSession = async (peerId: any, session: any) => {
		const allSessions = await getAllValidWalletConnectSessions();
		allSessions[peerId] = session;
		await AsyncStorage.setItem(connectionsStorageKey, JSON.stringify(allSessions));
	};

	const getAllWalletConnectUris = async (): Promise<string[]> => {
		const uris = (await AsyncStorage.getItem(urisStorageKey)) || '[]';
		return JSON.parse(uris);
	};

	const saveWalletConnectUri = async (uri: string) => {
		const uris = await getAllWalletConnectUris();
		const newWalletConnectUris = [...uris, uri];
		await AsyncStorage.setItem(urisStorageKey, JSON.stringify(newWalletConnectUris));
	};

	const walletConnectRejectSession = (peerId: string, walletConnector: WalletConnect) =>
		walletConnector.rejectSession();

	const walletConnectOnSessionRequest = async (
		uri: string,
		showApprovalModal: (params: HandleApprovalParams) => void
	) => {
		const walletConnectUris = await getAllWalletConnectUris();
		if (walletConnectUris.includes(uri)) return;

		saveWalletConnectUri(uri);
		const allSessions = await getAllValidWalletConnectSessions();
		const wcUri = parseWalletConnectUri(uri);

		const alreadyConnected = Object.values(allSessions).some(
			(session) => session.handshakeTopic === wcUri.handshakeTopic && session.key === wcUri.key
		);

		if (alreadyConnected) {
			return;
		}

		const walletConnector = new WalletConnect({ clientMeta, uri });
		const handleApproval = async (params: CallbackParams) => {
			console.log(
				'marquinhosmarquinhosmarquinhosmarquinhosmarquinhosmarquinhosmarquinhosmarquinhosmarquinhosmarquinhosmarquinhosmarquinhos'
			);
			// console.log('dentroa handle approval', { approved, accountAddress, chainId, peerId });
			// if (approved) {
			// 	walletConnector.approveSession({
			// 		accounts: [accountAddress],
			// 		chainId
			// 	});
			// 	saveWalletConnectSession(walletConnector.peerId, walletConnector.session);
			// } else {
			// 	walletConnectRejectSession(peerId, walletConnector);
			// }

			// @TODO: Marcos - Listen to new messages
			// const listeningWalletConnector = dispatch(
			// listenOnNewMessages(walletConnector)
			// );
		};

		console.log('setting the connection request listener');

		walletConnector.on('session_request', (error, payload) => {
			console.log({ payload });
			if (error) {
				throw error;
			}

			const { peerId, peerMeta, chainId } = payload.params[0];
			const { icons, name: dappName, scheme: dappScheme, url: dappUrl } = peerMeta;
			const [imageUrl] = icons;

			const meta: Meta = {
				chainId,
				dappName,
				dappScheme,
				dappUrl,
				imageUrl,
				peerId
			};
			console.log('vamos mostrar o modal de approvação');
			showApprovalModal({ connector: walletConnector, m: meta, handleApproval });
		});
	};

	return {
		saveWalletConnectSession,
		walletConnectOnSessionRequest
	};
};

export default useWalletConnectSessions;
