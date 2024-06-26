import {
  Skeleton,
  Stack,
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Th,
  Thead,
  Tr,
  Td,
} from '@chakra-ui/react';
import { useGetUsersQuery } from '@/entities/user';

export function UserTable() {
  const { data: users = [], isFetching } = useGetUsersQuery();

  if (isFetching) {
    return (
      <Stack gap={6}>
        {Array.from({ length: 7 }).map((_, idx) => (
          // eslint-disable-next-line react/no-array-index-key
          <Skeleton key={idx} height={6} />
        ))}
      </Stack>
    );
  }

  return (
    <TableContainer>
      <Table variant="striped" colorScheme="teal">
        <TableCaption>Список пользователей</TableCaption>
        <Thead>
          <Tr>
            <Th>Полное имя</Th>
            <Th>Логин</Th>
            <Th>Дата создания</Th>
          </Tr>
        </Thead>
        <Tbody>
          {users.map(({ id, fullName, login, createdAt }) => (
            <Tr key={id}>
              <Td>{fullName}</Td>
              <Td>{login}</Td>
              <Td>{new Date(createdAt).toLocaleTimeString()}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
}
