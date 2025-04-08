import Link from 'next/link';
import styles from './not-found.module.scss';

export default function NotFound() {
  return (
    <div className={styles.container}>
      <h1>🚧 Страница в разработке</h1>
      <p>Похоже, вы заглянули туда, где мы ещё не успели построить!</p>
      <p>Вернитесь <Link href="/">на главную</Link> или выпейте кофе ☕️</p>
      <div className={styles.coffee}>
        <span className={styles.steam}>💨</span>
        <span className={styles.cup}>☕️</span>
      </div>
    </div>
  );
}