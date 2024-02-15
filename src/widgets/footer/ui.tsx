import { AudioPlayer } from "@/features/ui/audio-player/ui";
import styles from "./styles.module.scss";

export function Footer() {
  return (
    <footer className={styles.footer}>
      <AudioPlayer />
    </footer>
  );
}
