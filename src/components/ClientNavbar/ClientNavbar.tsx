import Image from "next/image";
import styles from "./clientNavbar.module.scss";
import Link from "next/link";

export default function ClientNavbar() {
  return (
    <nav className={styles.navbar}>
      <Link href="/user-panel" className={styles.logo}>
        <Image
          className={styles.logoImage}
          src="/logo.png"
          height={64}
          width={64}
          alt="Logo"
        />
        <div className={styles.logoText}>Panel klienta</div>
      </Link>
      <ul className={styles.links}>
        <Link href="/user-panel/survey">
          <button className="btn-default">Ankieta</button>
        </Link>
        <Link href="/user-panel/payments">
          <button className="btn-default">Płatności</button>
        </Link>
        <Link href="/">
          <button className="btn-default">Wyloguj</button>
        </Link>
      </ul>
    </nav>
  );
}
