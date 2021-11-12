import Link from 'next/link';
import styles from '../styles/Navbar.module.css';

export default function Navbar() {
  return (
    <div className={styles.navbarBox}>
      <div className={styles.navbar}>
        <Link href='/'>
          <a className={styles.link}>Home</a>
        </Link>
        <Link href='/post'>
          <a className={styles.link}>Posts</a>
        </Link>
      </div>
    </div>
  );
}