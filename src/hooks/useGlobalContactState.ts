import { useState } from '@hookstate/core';
import { globalContactState } from '@src/stores/ContactStore';

const useGlobalContactState = () => useState(globalContactState());

export default useGlobalContactState;
