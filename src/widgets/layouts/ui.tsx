import { Outlet } from "react-router-dom";
import { Footer } from "../footer";
import { Header } from "../header";
import styles from "./styles.module.scss";

export function MainLayout() {
  return (
    <div className={styles["wrapper"]}>
      <Header />
      <div className={styles["main"]}>
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}

export function NakedLayout() {
  return <Outlet />;
}
