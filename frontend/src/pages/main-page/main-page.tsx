import { UserTable } from '@/features/user-table';
import { Box } from '@chakra-ui/react';

export function MainPage() {
  return (
    <Box mt={12} width="80%" mx="auto">
      <UserTable />
    </Box>
  );
}
