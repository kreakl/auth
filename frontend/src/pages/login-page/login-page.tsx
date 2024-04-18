import { PropsWithChildren } from 'react';
import { Container } from '@/shared/ui';

export function LoginPage({ children }: PropsWithChildren) {
  return (
    <Container
      bg="linear-gradient(124deg, #6B8CFF 6.72%, #70C3FF 57.32%, #75DEFF 102.34%)"
    >
      {children}
    </Container>
  );
}
