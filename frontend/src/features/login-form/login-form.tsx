import { useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Box, Heading, Stack } from '@chakra-ui/react';
import { Field, Form, SubmitButton } from '@/shared/ui';
import { useLoginMutation } from '@/entities/session';
import { LoginRequestDto } from '@/entities/session/api/types.ts';

type LoginFormData = LoginRequestDto;

export function LoginForm() {
  const [login] = useLoginMutation();
  const navigate = useNavigate();

  const onSubmit = useCallback(
    (data: LoginFormData) => {
      login({
        ...data,
      })
        .unwrap()
        .then(() => {
          navigate('/');
        })
        .catch((error) => error);
    },
    [login, navigate]
  );
  const requiredMessage = 'Поле необходимо для заполнения!';

  return (
    <Form
      onSubmit={onSubmit}
      bg="white"
      width={['95%', '70%', '50%', null, '30%']}
      minHeight="50%"
      borderRadius="xl"
      position="absolute"
      left="50%"
      top="50%"
      transform="translateY(-50%) translateX(-50%)"
      px={{ base: 5, md: '4rem ' }}
      py={{ base: 5, md: '3rem ' }}
    >
      <Stack alignItems="center" gap={8}>
        <Heading as="h2" fontSize={{ base: 'xl', lg: '2xl' }} fontWeight="600" textAlign="center">
          Создание нового пользователя
        </Heading>
        <Field
          label="Логин"
          placeholder="Введите логин пользователя"
          rules={{ required: { value: true, message: requiredMessage } }}
          name="login"
          type="text"
        />
        <Field
          label="Пароль"
          rules={{ required: { value: true, message: requiredMessage } }}
          placeholder="Введите пароль пользователя"
          name="password"
          type="password"
        />
        <SubmitButton my={4} colorScheme="blue" width="90%">
          Войти
        </SubmitButton>
        <Box color="blue.400" textDecoration="underline">
          <Link to="/register">Нет аккаунта? Зарегистрироваться</Link>
        </Box>
      </Stack>
    </Form>
  );
}
