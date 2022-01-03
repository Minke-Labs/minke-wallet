import React from 'react';
import AntDesignIcon from 'react-native-vector-icons/AntDesign';
import EntypoIcon from 'react-native-vector-icons/Entypo';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import { EstimateGasResponse } from '../../model/wallet';
import GasOption from './GasOption';

const GasSelector = ({ gweiPrice, gasPrice }: { gweiPrice: number; gasPrice: EstimateGasResponse }) => (
	<>
		<GasOption
			title="Normal"
			icon={<AntDesignIcon name="clockcircleo" color="#006AA6" size={20} />}
			gweiValue={gasPrice.average}
			gweiPrice={gweiPrice}
			wait={gasPrice.avgWait}
		/>

		<GasOption
			title="Low"
			icon={<MaterialIcon name="turtle" color="#006AA6" size={20} />}
			gweiValue={gasPrice.safeLow}
			gweiPrice={gweiPrice}
			wait={gasPrice.safeLowWait}
		/>

		<GasOption
			title="Fast"
			icon={<EntypoIcon name="flash" color="#006AA6" size={20} />}
			gweiValue={gasPrice.fast}
			gweiPrice={gweiPrice}
			wait={gasPrice.fastWait}
		/>

		<GasOption
			title="Fastest"
			icon={<EntypoIcon name="flash" color="#006AA6" size={20} />}
			gweiValue={gasPrice.fastest}
			gweiPrice={gweiPrice}
			wait={gasPrice.fastestWait}
		/>
	</>
);

export default GasSelector;
