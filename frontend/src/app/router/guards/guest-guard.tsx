import { Navigate } from 'react-router-dom';
import { PropsWithChildren } from 'react';
import { useAppSelector } from '@/shared/model';
import { selectIsAuthorized } from '@/entities/session';

export function GuestGuard({ children }: PropsWithChildren) {
  const isAuthorized = useAppSelector(selectIsAuthorized);

  if (!isAuthorized) return <Navigate to="/login" />;

  return children;
}
