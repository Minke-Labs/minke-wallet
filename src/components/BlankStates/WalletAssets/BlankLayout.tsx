import React from 'react';
import { BasicLayout } from '@layouts';

export const BlankLayout: React.FC = ({ children }) => (
  <BasicLayout hideSafeAreaView center>
    {children}
  </BasicLayout>
);
