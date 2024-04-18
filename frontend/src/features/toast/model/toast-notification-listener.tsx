import { createStandaloneToast } from '@chakra-ui/react';
import { showToast } from '@/shared/lib';

// https://chakra-ui.com/docs/components/toast/usage#standalone-toasts
export const { ToastContainer, toast } = createStandaloneToast();

export const addToastNotificationsListener = (startAppListening: AppStartListening) => {
  startAppListening({
    actionCreator: showToast,
    effect: (action: any) => {
      const { ...props } = action.payload;
      toast({
        isClosable: true,
        position: 'bottom-right',
        ...props,
      });
    },
  });
};
