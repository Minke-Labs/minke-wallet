import { useContext } from 'react';
import { AvatarContext } from '../contexts/AvatarContext/AvatarContext';

const useAvatar = () => useContext(AvatarContext);

export default useAvatar;
