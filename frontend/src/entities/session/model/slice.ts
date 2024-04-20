import { createSlice, isAnyOf } from '@reduxjs/toolkit';
import { sessionApi } from '../api/session-api.ts';
import { Session } from '@/entities/session';
import { refreshTokenAction } from '@/shared/api/refresh-token-action.ts';

type SessionSliceState = Partial<Session> & {
  isAuthorized: boolean;
};

const initialState: SessionSliceState = {
  isAuthorized: false,
};

export const sessionSlice = createSlice({
  name: 'session',
  initialState,
  reducers: {
    clearSessionData: (state) => {
      state.refreshToken = undefined;
      state.accessToken = undefined;
      state.userId = undefined;
      state.isAuthorized = false;
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      isAnyOf(sessionApi.endpoints.login.matchFulfilled, refreshTokenAction),
      (state: SessionSliceState, { payload }) => {
        state.isAuthorized = true;
        state.userId = payload.userId;
        state.accessToken = payload.accessToken;
        state.refreshToken = payload.refreshToken;
      }
    );
  },
});

export const selectIsAuthorized = (state: RootState) => state.session.isAuthorized;

export const selectUserId = (state: RootState) => state.session.userId;

export const { clearSessionData } = sessionSlice.actions;
