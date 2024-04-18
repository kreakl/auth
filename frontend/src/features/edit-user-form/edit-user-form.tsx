import { useCallback } from 'react';
import { Field, Form, FormProps, SubmitButton } from '@/shared/ui';
import { useNavigate } from 'react-router-dom';
import {  Button, ButtonGroup, Heading, Stack } from '@chakra-ui/react';
import { CreateUserDto, useGetUserByIdQuery, useUpdateUserMutation } from '@/entities/user';
import { useAppSelector } from '@/shared/model';
import { selectUserId } from '@/entities/session';

type EditUserFormData = CreateUserDto;

type EditUserFormProps = Omit<FormProps, 'onSubmit'>;

export function EditUserForm(props: EditUserFormProps) {
  const userId = useAppSelector(selectUserId) as number;
  const [editUser] = useUpdateUserMutation();
  const { data: user } = useGetUserByIdQuery(userId);
  const { login, fullName } = user || {};

  const navigate = useNavigate();

  const onSubmit = useCallback(
    (data: EditUserFormData) => {

      editUser({
        id: userId,
        ...data,
      })
      .unwrap()
      .then(() => {
          navigate('../')
      })
      .catch((error) => error);
    },
    [editUser, userId]
  );

  const requiredMessage = 'Поле необходимо для заполнения!';

  return (
    <Form
      // @ts-ignore
      onSubmit={onSubmit}
      bg="white"
      width={['95%', '70%', '50%', null, '30%']}
      borderRadius="xl"
      boxShadow="lg"
      px={{base: 5, md: "4rem "}}
      py={{base: 5, md: "3rem "}}
      {...props}
    >
      <Stack alignItems="center" gap={8}>
        <Heading as="h2" fontSize={{ base: 'xl', lg: '2xl' }} fontWeight="600" textAlign="center">
          Редактирование пользователя
        </Heading>
        <Field
          defaultValue={login}
          label="Логин"
          placeholder="Введите логин пользователя"
          rules={{ required: { value: true, message: requiredMessage }}}
          name="login"
          type="text"
        />
        <Field
          defaultValue={fullName}
          label="ФИО"
          placeholder="Введите имя пользователя"
          rules={{ required: { value: true, message: requiredMessage }}}
          name="fullName"
          type="text"
        />
        <Field
          label="Пароль"
          rules={{ required: { value: true, message: requiredMessage }}}
          placeholder="Введите пароль пользователя"
          name="password"
          type="password"
        />
        <ButtonGroup width="100%" alignItems="center">
          <Button flex="1" colorScheme="teal" onClick={() => navigate('../')}>Назад</Button>
          <SubmitButton flex="1" my={4} colorScheme="blue" width="90%">
            Сохранить
          </SubmitButton>
        </ButtonGroup>
      </Stack>
    </Form>
  );
}
