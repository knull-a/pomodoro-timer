import { Outlet } from "react-router-dom";
import { Footer } from "@/shared/ui/footer";
import { Header } from "@/shared/ui/header";

export function MainLayout() {
  return (
    <div>
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
}

export function NakedLayout() {
  return <Outlet />;
}
