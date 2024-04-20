import { Navigate } from 'react-router-dom';
import { PropsWithChildren } from 'react';
import { useAppSelector } from '@/shared/model';
import { selectIsAuthorized } from '@/entities/session';

export function AuthGuard({ children }: PropsWithChildren) {
  const isAuthorized = useAppSelector(selectIsAuthorized);

  if (isAuthorized) return <Navigate to="/" />;

  return children;
}
