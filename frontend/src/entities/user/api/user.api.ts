import {
  baseApi,
  USER_TAG,
  isFetchBaseQueryError,
  isFetchBaseQueryErrorWithMessage,
} from '@/shared/api';
import { CreateUserDto, UpdateUserDto, type UserDto } from './types';

import { showToast } from '@/shared/lib';

export const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getUserById: builder.query<UserDto, number>({
      query: (id) => ({
        url: `/user/${id}`,
      }),
      providesTags: (result) => (result ? [{ type: USER_TAG, id: result.id }] : []),
    }),
    createUser: builder.mutation<UserDto, CreateUserDto>({
      query: (body) => ({
        url: '/user',
        body,
        method: 'POST',
      }),
      transformResponse: (result: UserDto, meta, { login }) => {
        meta?.dispatch(
          showToast({
            title: `Пользователь ${login} был успешно создан!`,
            status: 'success',
          })
        );

        return result;
      },
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
              title: 'Не удалось создать пользователя!',
              description,
              status: 'error',
            })
          );
        }

        return error;
      },
    }),
    updateUser: builder.mutation<UserDto, UpdateUserDto>({
      query: ({ id, ...body }) => ({
        url: `/user/${id}`,
        body,
        method: 'PATCH',
      }),
      invalidatesTags: (result) => (result ? [{ type: USER_TAG, id: result.id }] : []),
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
              title: 'Не удалось обновить пользователя!',
              description,
              status: 'error',
            })
          );
        }

        return error;
      },
      transformResponse: (result: UserDto, meta) => {
        meta?.dispatch(
          showToast({
            title: `Данные пользователя успешно обновлены!`,
            status: 'success',
          })
        );

        return result;
      },
    }),
    getUsers: builder.query<UserDto[], void>({
      query: () => ({
        url: '/user',
      }),
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
              title: 'Не удалось получить пользователей!',
              description,
              status: 'error',
            })
          );
        }

        return error;
      },
    }),
  }),
});

export const {
  useGetUsersQuery,
  useGetUserByIdQuery,
  useCreateUserMutation,
  useUpdateUserMutation,
} = userApi;
