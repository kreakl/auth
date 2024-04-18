import { createHashRouter, Navigate } from 'react-router-dom';
import { ReactElement } from 'react';
import { useAppSelector } from '@/shared/model';
import { selectIsAuthorized } from '@/entities/session';
import { LoginPage } from '@/pages/login-page';
import { BaseLayout } from '@/app/base-layout.tsx';
import { MainPage } from '@/pages/main-page';
import { LoginForm } from '@/features/login-form';
import { RegisterForm } from '@/features/register-form';
import { LayoutWithHeader } from '@/app/layout-with-header.tsx';
import { ProfilePage } from '@/pages/profile-page/profile-page.tsx';

type GuestGuardProps = {
  children: ReactElement
}

function GuestGuard({ children }: GuestGuardProps) {
  const isAuthorized = useAppSelector(selectIsAuthorized)

  if (!isAuthorized) return <Navigate to="/login" />

  return children
}

type AuthGuardProps = {
  children: ReactElement
}

function AuthGuard({ children }: AuthGuardProps) {
  const isAuthorized = useAppSelector(selectIsAuthorized)

  if (isAuthorized) return <Navigate to="/" />

  return children
}

export const router = createHashRouter([
  {
    element:  (
      <AuthGuard>
        <BaseLayout />
      </AuthGuard>
    ),
    children: [
      {
        path: '/login',
        element: (
          <LoginPage>
            <LoginForm />
          </LoginPage>
        ),
      },
      {
        path: '/register',
        element: (
          <LoginPage>
            <RegisterForm />
          </LoginPage>
        ),
      },
    ],
  },
  {
    path: '/',
    element: (
      <GuestGuard>
        <LayoutWithHeader />
      </GuestGuard>
    ),
    children: [
      {
        path: '/',
        element: <MainPage />,
      },
      {
        path: '/profile/:id',
        element: (
          <ProfilePage />
        ),
      },
    ],
  },
]);
