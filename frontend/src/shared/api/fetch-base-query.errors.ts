import { type FetchBaseQueryError } from '@reduxjs/toolkit/query';

export function isFetchBaseQueryError(error: unknown): error is FetchBaseQueryError {
  return typeof error === 'object' && error != null && 'status' in error;
}

export function isFetchBaseQueryErrorWithMessage(data: unknown): data is { message: string } {
  return (
    typeof data === 'object' &&
    data != null &&
    'message' in data &&
    typeof (data as any).message === 'string'
  );
}
