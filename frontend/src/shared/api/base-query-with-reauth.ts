import type {
  FetchArgs,
  FetchBaseQueryError,
  FetchBaseQueryMeta,
  BaseQueryFn,
} from '@reduxjs/toolkit/query';
import { Mutex } from 'async-mutex';
import { baseQuery } from './base-query';
import { refreshAccessToken } from './refresh-token';

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
        api.dispatch(refreshAccessToken());
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
