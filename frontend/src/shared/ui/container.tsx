import { Box, BoxProps } from '@chakra-ui/react';
import { ReactNode } from 'react';

export interface ContainerProps extends BoxProps {
  children: ReactNode;
}

export function Container({ children, ...props }: ContainerProps) {
  return (
    <Box minHeight="100vh" minWidth="100vw" width="100%" height="100%" {...props}>
      {children}
    </Box>
  );
}
