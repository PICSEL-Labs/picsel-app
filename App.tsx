import React from 'react';

import MainRoute from '@/navigation';
import SignupRoute from '@/navigation/route/signup';
import AppProvider from '@/providers/AppProvider';
import { useUserStore } from '@/shared/store';

function App() {
  const { refreshToken } = useUserStore();

  return (
    <AppProvider>{refreshToken ? <MainRoute /> : <SignupRoute />}</AppProvider>
  );
}

export default App;
