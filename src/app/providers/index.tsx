import "@/app/styles/index.scss";
import { withSuspense } from "@/shared/lib/react";
import { Loader } from "@/shared/ui/loader";
import { BrowserRouter } from "./RouterProvider";

function Providers() {
  return <BrowserRouter />;
}

export const Provider = withSuspense(Providers, {
  fallback: <Loader size="full" />,
});
