import { Link } from "react-router-dom";
import { pathKeys } from "@/shared/lib/react-router";
import { ScreenCenteredWrapper } from "@/shared/ui/screen-centered-wrapper";
import styles from "./styles.module.scss";

export function NotFoundPage() {
  return (
    <ScreenCenteredWrapper>
      <div className={styles["inner-wrapper"]}>
        <h2>
          404 <br /> Page Not Found
        </h2>
        <p>Sorry, we couldn't find the page you're looking for.</p>
        <Link to={pathKeys.home()} className="btn btn-sm btn-outline-primary">
          Go back home
        </Link>
      </div>
    </ScreenCenteredWrapper>
  );
}
