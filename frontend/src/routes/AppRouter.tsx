import { Layout } from '@/components/ui/layout';
import ListPage from '@/pages/ListPage';
import UploadPage from '@/pages/UploadPage';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <UploadPage />,
      },
      {
        path: '/list',
        element: <ListPage />,
      },
    ],
  },
]);

const AppRouter: React.FC = () => <RouterProvider router={router} />;

export default AppRouter;
