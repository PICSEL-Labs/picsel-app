import React from 'react';

import MainRoute from '@/navigation';
import AppProvider from '@/providers/AppProvider';

function App() {
  return (
    <AppProvider>
      <MainRoute />
    </AppProvider>
  );
}

export default App;
