import { PropsWithChildren } from 'react';
import { Box } from '@chakra-ui/react';

export function LoginPage({ children }: PropsWithChildren) {
  return (
    <Box
      minHeight="100vh"
      minWidth="100vw"
      width="100%"
      height="100%"
    >
      {children}
    </Box>
  );
}
