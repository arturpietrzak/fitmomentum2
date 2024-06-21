import Link from "next/link";
import styles from "./login.module.scss";
import { api } from "~/utils/api";
import { useState } from "react";
import { useRouter } from "next/router";
import useAccount from "~/utils/useAccount";

export default function LoginPage() {
  const { mutateAsync } = api.example.login.useMutation();
  const router = useRouter();
  const { login } = useAccount();

  return (
    <main className={styles.main}>
      <form
        className={styles.form}
        onSubmit={(e) => {
          e.preventDefault();
          void mutateAsync({
            username: e.target[0].value,
            password: e.target[1].value,
          }).then((value) => {
            if (value) {
              login(e.target[0].value);
              router.push("/user-panel");
            } else {
              alert("Dane nie są poprawne");
            }
          });
        }}
      >
        <input name="username" placeholder="Nazwa użytkownika" />
        <input name="password" placeholder="Hasło" type="password" />
        <button className="btn-default">Zaloguj</button>
        <div>
          <span>Nie masz konta? </span>
          <Link href="/register">Zarejestruj się tutaj</Link>
        </div>
      </form>
    </main>
  );
}
