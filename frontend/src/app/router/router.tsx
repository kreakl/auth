import { createHashRouter } from 'react-router-dom';
import { BaseLayout, LayoutWithHeader } from './layouts';
import { LoginPage } from '@/pages/login-page';
import { MainPage } from '@/pages/main-page';
import { LoginForm } from '@/features/login-form';
import { RegisterForm } from '@/features/register-form';
import { ProfilePage } from '@/pages/profile-page';
import { AuthGuard, GuestGuard } from './guards';

export const router = createHashRouter([
  {
    element: (
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
        element: <ProfilePage />,
      },
    ],
  },
]);
