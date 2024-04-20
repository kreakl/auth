import { createStandaloneToast, type UseToastOptions } from '@chakra-ui/react';
import { type PayloadAction } from '@reduxjs/toolkit';
import { showToast } from '@/shared/lib';

// https://chakra-ui.com/docs/components/toast/usage#standalone-toasts
export const { ToastContainer, toast } = createStandaloneToast();

export const addToastNotificationsListener = (startAppListening: AppStartListening) => {
  startAppListening({
    actionCreator: showToast,
    effect: (action: PayloadAction<UseToastOptions>) => {
      const { ...props } = action.payload;
      toast({
        isClosable: true,
        position: 'bottom-right',
        ...props,
      });
    },
  });
};
