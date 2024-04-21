import { Avatar, Flex, Stack, Link as ChakraLink } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { useGetCurrentUserQuery } from '@/entities/user';
import { logout } from '@/entities/session';
import { useAppDispatch } from '@/shared/model';

export function Header() {
  const { data: user } = useGetCurrentUserQuery();
  const dispatch = useAppDispatch();
  const { fullName = '' } = user || {};

  return (
    <Flex
      as="nav"
      align="center"
      justify="end"
      gap={20}
      wrap="wrap"
      padding="1.5rem"
      bg="teal.200"
      color="white"
      minWidth="100vw"
    >
      <Stack gap={4} alignItems="center">
        <Avatar name={fullName} />
        <ChakraLink as="div" color="blue.600">
          <Link to={`/profile`}>Профиль пользователя</Link>
        </ChakraLink>
        <ChakraLink as="div" color="blue.600">
          <Link to="/login" onClick={() => dispatch(logout())}>
            Выйти из аккаунта
          </Link>
        </ChakraLink>
      </Stack>
    </Flex>
  );
}
