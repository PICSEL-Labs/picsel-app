import React from 'react';

import MainRoute from '@/navigation';
import AppProvider from '@/providers/AppProvider';
import { useSplashScreen } from '@/shared/hooks/useSplashScreen';

function App() {
  useSplashScreen();

  return (
    <AppProvider>
      <MainRoute />
    </AppProvider>
  );
}

export default App;
