import styles from "./styles.module.scss";

export function Header() {
  return (
    <header className={styles["header"]}>
      <div className={styles["header-logo"]}>
        <img src="img/clock.png" alt="Logo" className={styles["logo-image"]} />
        <span className={styles["logo-name"]}>
          pomodoro by <a href="https://github.com/knull-a">knull-a</a>
        </span>
      </div>
    </header>
  );
}
