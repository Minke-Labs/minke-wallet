import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '@src/routes/types.routes';

export default () => useNavigation<NativeStackNavigationProp<RootStackParamList>>();
