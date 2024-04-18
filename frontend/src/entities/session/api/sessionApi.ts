import { baseApi, isFetchBaseQueryError, isFetchBaseQueryErrorWithMessage, SESSION_TAG } from '@/shared/api'
import type { LoginRequestBody, SessionDto } from './types'
import { showToast } from '@/shared/lib';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { clearSessionData } from '@/entities/session';

export const sessionApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    logout: build.mutation<void, string>({
      query: (refreshToken) => ({
        url: `/auth/tokens/${refreshToken}`,
        method: 'DELETE',
      }),
    }),
    login: build.mutation<SessionDto, LoginRequestBody>({
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
    refreshToken: build.mutation<SessionDto, string>({
      query: (refreshToken) => ({
        url: `/auth/tokens/${refreshToken}`,
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

})

export const logout = createAsyncThunk('logout', async (_, { dispatch, getState }) => {
  const refreshToken = (getState() as RootState).session.refreshToken;

  try {
    await dispatch(sessionApi.endpoints.logout.initiate(refreshToken!)).unwrap();
  } finally {
    dispatch(clearSessionData());
  }
})

export const { useLoginMutation  } = sessionApi
