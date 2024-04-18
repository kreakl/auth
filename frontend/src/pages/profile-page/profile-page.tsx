import { Container } from '@/shared/ui';
import { EditUserForm } from '@/features/edit-user-form/edit-user-form.tsx';

export function ProfilePage() {
  return (
    <Container width="50%">
      <EditUserForm
        mt={10} mx="auto"
      />
    </Container>
  )
}