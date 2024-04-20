import type {
  FetchArgs,
  FetchBaseQueryError,
  FetchBaseQueryMeta,
  BaseQueryFn,
} from '@reduxjs/toolkit/query';
import { Mutex } from 'async-mutex';
import { baseQuery } from './base-query';

// FSD VIOLATION
import { type SessionDto } from '@/entities/session';
import { refreshTokenAction } from './refresh-token-action.ts';
import { clearSessionAction } from './clear-session-action.ts';

const AUTH_ERROR_CODES = new Set([401]);

// create a new mutex
const mutex = new Mutex();

type Meta = {
  dispatch: AppDispatch;
  state: RootState;
};

export const baseQueryWithReauth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError,
  NonNullable<unknown>,
  Meta & FetchBaseQueryMeta
> = async (args, api, extraOptions) => {
  await mutex.waitForUnlock();
  let result = await baseQuery(args, api, extraOptions);

  if (typeof result.error?.status === 'number' && AUTH_ERROR_CODES.has(result.error.status)) {
    if (!mutex.isLocked()) {
      const release = await mutex.acquire();
      try {
        const { refreshToken } = (api.getState() as RootState).session;
        const refreshResult = await baseQuery(
          {
            url: '/auth/tokens/refresh',
            method: 'POST',
            body: { refreshToken },
          },
          api,
          extraOptions
        );

        if (refreshResult.data) {
          api.dispatch(refreshTokenAction(refreshResult.data as SessionDto));
          result = await baseQuery(args, api, extraOptions);
        } else {
          api.dispatch(clearSessionAction());
        }
      } finally {
        release();
      }
    } else {
      await mutex.waitForUnlock();
      result = await baseQuery(args, api, extraOptions);
    }
  }

  return {
    ...result,
    meta: result.meta && {
      ...result.meta,
      dispatch: api.dispatch,
      state: api.getState() as RootState,
    },
  };
};
