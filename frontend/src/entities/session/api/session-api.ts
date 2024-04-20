import {
  baseApi,
  isFetchBaseQueryError,
  isFetchBaseQueryErrorWithMessage,
  SESSION_TAG,
} from '@/shared/api';
import type { LoginRequestDto, RefreshTokenRequestDto, SessionDto } from './types';
import { showToast } from '@/shared/lib';
import { clearSessionData } from '@/entities/session';
import { createAppAsyncThunk } from '@/shared/model';

export const sessionApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    logout: build.mutation<void, string | undefined>({
      query: (refreshToken) => ({
        url: `/auth/tokens/${refreshToken}`,
        method: 'DELETE',
      }),
    }),
    login: build.mutation<SessionDto, LoginRequestDto>({
      query: (body) => ({
        url: '/auth/tokens',
        method: 'POST',
        body,
      }),
      invalidatesTags: [SESSION_TAG],
      transformErrorResponse: (error, meta) => {
        if (isFetchBaseQueryError(error)) {
          let description: string;
          if (isFetchBaseQueryErrorWithMessage(error.data)) {
            description = error.data.message;
          } else {
            description = JSON.stringify(error);
          }

          meta?.dispatch(
            showToast({
              title: 'Ошибка авторизации!',
              description,
              status: 'error',
              duration: 1000,
            })
          );
        }

        return error;
      },
    }),
    refreshToken: build.mutation<SessionDto, RefreshTokenRequestDto>({
      query: (body) => ({
        url: '/auth/tokens/refresh',
        method: 'POST',
        body,
      }),
      invalidatesTags: [SESSION_TAG],
      transformErrorResponse: (error, meta) => {
        if (isFetchBaseQueryError(error)) {
          let description: string;
          if (isFetchBaseQueryErrorWithMessage(error.data)) {
            description = error.data.message;
          } else {
            description = JSON.stringify(error);
          }

          meta?.dispatch(
            showToast({
              title: 'Сессия истекла!',
              description,
              status: 'error',
              duration: 1000,
            })
          );
        }

        return error;
      },
    }),
  }),
});

export const logout = createAppAsyncThunk('session/logout', async (_, { dispatch , getState }) => {
  dispatch(clearSessionData());
  await dispatch(
    sessionApi.endpoints.logout.initiate((getState() as RootState).session.refreshToken)
  ).unwrap();
});

export const { useLoginMutation } = sessionApi;
