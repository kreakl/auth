import { ToastProps } from '@chakra-ui/react';
import { createAction } from '@reduxjs/toolkit';

export const showToast = createAction<ToastProps>('notification/toast');
