import { Box } from '@chakra-ui/react';
import { UserTable } from '@/features/user-table';

export function MainPage() {
  return (
    <Box mt={12} width="80%" mx="auto">
      <UserTable />
    </Box>
  );
}
