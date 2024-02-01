import type { PropsWithChildren } from "react";
import styles from "./styles.module.scss";

export function ScreenCenteredWrapper({ children }: PropsWithChildren) {
  return <div className={styles.wrapper}>{children}</div>;
}
