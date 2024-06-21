import Link from "next/link";
import styles from "./login.module.scss";
import { api } from "~/utils/api";
import { useRouter } from "next/router";
import useAccount from "~/utils/useAccount";

export default function RegisterPage() {
  const { mutateAsync } = api.example.register.useMutation();
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
            email: e.target[1].value,
            password: e.target[2].value,
          }).then((value) => {
            if (value) {
              login(e.target[0].value);
              router.push("/user-panel");
            }
          });
        }}
      >
        <input placeholder="Nazwa użytkownika" />
        <input placeholder="Adres email" />
        <input placeholder="Hasło" type="password" />
        <button className="btn-default">Stwórz konto</button>
        <div>
          <span>Masz już konto? </span>
          <Link href="/login">Zaloguj się tutaj</Link>
        </div>
      </form>
    </main>
  );
}
