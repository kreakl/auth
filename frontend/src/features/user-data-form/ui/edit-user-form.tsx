import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, ButtonGroup, Heading, Stack } from '@chakra-ui/react';
import { Field, Form, FormProps, SubmitButton } from '@/shared/ui';
import { useGetCurrentUserQuery, useUpdateUserMutation } from '@/entities/user';
import { UpdateUserDto } from '@/entities/session';
import { userFormRules } from '@/features/user-data-form/lib';

type EditUserFormData = UpdateUserDto;

type EditUserFormProps = Omit<FormProps, 'onSubmit'>;

export function EditUserForm(props: EditUserFormProps) {
  const [editUser] = useUpdateUserMutation();
  const { data: user } = useGetCurrentUserQuery();
  const { login, fullName, id = 0 } = user || {};

  const navigate = useNavigate();

  const onSubmit = useCallback(
    (data: EditUserFormData) => {
      editUser({
        id,
        ...data,
        password: data.password ? data.password : undefined,
      })
        .unwrap()
        .then(() => {
          navigate('../');
        })
        .catch((error) => error);
    },
    [editUser, navigate, id]
  );

  return (
    <Form
      onSubmit={onSubmit}
      bg="white"
      width={['95%', '70%', '50%', null, '30%']}
      borderRadius="xl"
      boxShadow="lg"
      px={{ base: 5, md: '4rem ' }}
      py={{ base: 5, md: '3rem ' }}
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
          rules={userFormRules.login}
          name="login"
          type="text"
        />
        <Field
          defaultValue={fullName}
          label="ФИО"
          rules={userFormRules.fullName}
          name="fullName"
          type="text"
        />
        <Field
          label="Пароль"
          rules={{ ...userFormRules.password, required: false }}
          placeholder="Введите пароль пользователя"
          name="password"
          type="password"
        />
        <ButtonGroup width="100%" alignItems="center">
          <Button flex="1" colorScheme="teal" onClick={() => navigate('../')}>
            Назад
          </Button>
          <SubmitButton flex="1" my={4} colorScheme="blue" width="90%">
            Сохранить
          </SubmitButton>
        </ButtonGroup>
      </Stack>
    </Form>
  );
}
