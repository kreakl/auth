import { createAction } from '@reduxjs/toolkit';

// If called directly throws because of uninitialized baseApi
export const clearSessionAction = createAction('session/clearSessionData');
