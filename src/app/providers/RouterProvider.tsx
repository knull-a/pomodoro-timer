import { createElement } from "react";
import {
  RouterProvider,
  createBrowserRouter,
  redirect,
  useRouteError,
} from "react-router-dom";
import { HomePage } from "@/pages/home";
import { NotFoundPage } from "@/pages/not-found";
import { pathKeys } from "@/shared/lib/react-router";
import { MainLayout, NakedLayout } from "@/shared/ui/layouts";

// https://github.com/remix-run/react-router/discussions/10166
function BubbleError() {
  const error = useRouteError();
  if (error) throw error;
  return null;
}

const router = createBrowserRouter([
  {
    errorElement: <BubbleError />,
    children: [
      {
        element: <MainLayout />,
        children: [
          {
            path: pathKeys.home(),
            element: createElement(HomePage),
          },
        ],
      },
      {
        element: <NakedLayout />,
        children: [
          {
            path: pathKeys.page404(),
            element: createElement(NotFoundPage),
          },
        ],
      },
      {
        loader: async () => redirect(pathKeys.page404()),
        path: "*",
      },
    ],
  },
]);

export function BrowserRouter() {
  return <RouterProvider router={router} />;
}
