import { useNavigation as nativeNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '@src/routes/types.routes';

const useNavigation = () => nativeNavigation<NativeStackNavigationProp<RootStackParamList>>();
export default useNavigation;
