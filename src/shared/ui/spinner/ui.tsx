import styles from './styles.module.scss';

export function Spinner() {
  return (
    <div className={styles['lds-ring']}>
      <div />
      <div />
      <div />
      <div />
    </div>
  );
}