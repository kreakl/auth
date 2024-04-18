import { createListenerMiddleware } from '@reduxjs/toolkit';
import { addToastNotificationsListener } from '@/features/toast';

export const listenerMiddleware = createListenerMiddleware();

export const startAppListening = listenerMiddleware.startListening as AppStartListening;

addToastNotificationsListener(startAppListening);
