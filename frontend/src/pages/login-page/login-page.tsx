import { PropsWithChildren } from 'react';
import { Container } from '@/shared/ui';

export function LoginPage({ children }: PropsWithChildren) {
  return (
    <Container bg="linear-gradient(91.9deg, rgb(93, 248, 219) 27.8%, rgb(33, 228, 246) 67%)">
      {children}
    </Container>
  );
}
