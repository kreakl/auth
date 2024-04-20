import { createAction } from '@reduxjs/toolkit';
import type { SessionDto } from '@/entities/session';

export const refreshTokenAction = createAction<SessionDto>('session/refresh-token');
