import { createBrowserRouter } from 'react-router';

import { FoundationPage } from '@/pages/foundation-page';
import { routePaths } from '@/routes/route-definitions';

export const applicationRouter = createBrowserRouter([
  {
    path: routePaths.public.foundation,
    element: <FoundationPage />,
  },
]);
