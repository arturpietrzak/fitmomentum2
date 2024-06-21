"use client";

import Image from "next/image";
import styles from "./navbar.module.scss";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";

export default function Navbar() {
  const [isOnTop, setIsOnTop] = useState(true);

  const handleScroll = () => {
    setIsOnTop(window.scrollY === 0);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <nav className={`${styles.navbar} ${isOnTop ? "" : styles.blur}`}>
      <div className={styles.logo}>
        <Image
          className={styles.logoImage}
          src="/logo.png"
          height={64}
          width={64}
          alt="Logo"
        />
        <div className={styles.logoText}>FitMomentum</div>
      </div>
      <Link href="/login">
        <button className={styles.myAccount}>Moje konto</button>
      </Link>
    </nav>
  );
}
