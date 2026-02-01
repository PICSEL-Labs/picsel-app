import React, { useEffect } from 'react';

import { NavigationContainer } from '@react-navigation/native';

import MainRoute from '@/navigation';
import SignupRoute from '@/navigation/route/signup';
import AppProvider from '@/providers/AppProvider';
import { useUserStore } from '@/shared/store';

function App() {
  const { refreshToken } = useUserStore();

  useEffect(() => {}, [refreshToken]);

  return (
    <AppProvider>
      <NavigationContainer key={refreshToken ? 'authenticated' : 'guest'}>
        {refreshToken ? <MainRoute /> : <SignupRoute />}
      </NavigationContainer>
    </AppProvider>
  );
}

export default App;
