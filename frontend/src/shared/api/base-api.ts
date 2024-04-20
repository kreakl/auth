import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQueryWithReauth } from '@/shared/api/base-query-with-reauth.ts';

export const SESSION_TAG = 'SESSION_TAG';
export const USER_TAG = 'USER_TAG';

export const baseApi = createApi({
  tagTypes: [SESSION_TAG, USER_TAG],
  reducerPath: 'api',
  baseQuery: baseQueryWithReauth,
  endpoints: () => ({}),
});
