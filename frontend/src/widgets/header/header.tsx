import { Avatar,  Flex, Stack, Link as ChakraLink } from '@chakra-ui/react';
import { useGetUserByIdQuery } from '@/entities/user';
import { logout, selectUserId } from '@/entities/session';
import { useAppDispatch, useAppSelector } from '@/shared/model';
import { Link } from 'react-router-dom';

export function Header() {
  const userId = useAppSelector(selectUserId);
  const { data: user} = useGetUserByIdQuery(userId!);
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
        <ChakraLink color="blue.600">
          <Link to={`/profile/${userId}`}>
            Профиль пользователя
          </Link>
        </ChakraLink>
        <ChakraLink color="blue.600">
          <Link to={'/login'} onClick={() => dispatch(logout())}>
            Выйти из аккаунта
          </Link>
        </ChakraLink>
      </Stack>
    </Flex>
  );
}
