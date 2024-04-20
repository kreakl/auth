import { Outlet } from 'react-router-dom';
import { Header } from '@/widgets/header';

export function LayoutWithHeader() {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
}
