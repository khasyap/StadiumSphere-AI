import { RouterProvider } from 'react-router';

import { ApplicationProviders } from '@/providers/application-providers';
import { applicationRouter } from '@/routes/application-router';

export function Application() {
  return (
    <ApplicationProviders>
      <RouterProvider router={applicationRouter} />
    </ApplicationProviders>
  );
}
