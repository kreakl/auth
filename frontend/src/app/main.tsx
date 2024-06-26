import { ChakraProvider } from '@chakra-ui/react';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider as ReduxProvider } from 'react-redux';
import { RouterProvider } from 'react-router-dom';

import { PersistGate } from 'redux-persist/integration/react';
import { appStore, persistor } from './redux/app-store.ts';
import { router } from './router/router.tsx';
import { ToastContainer } from '@/features/toast';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ChakraProvider>
      <ReduxProvider store={appStore}>
        <PersistGate loading={null} persistor={persistor}>
          <RouterProvider router={router} />
          <ToastContainer />
        </PersistGate>
      </ReduxProvider>
    </ChakraProvider>
  </React.StrictMode>
);
