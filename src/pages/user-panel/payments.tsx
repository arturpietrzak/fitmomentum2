import ClientNavbar from "~/components/ClientNavbar/ClientNavbar";
import styles from "./userpanel.module.scss";
import useAccount from "~/utils/useAccount";
import { api } from "~/utils/api";
import { useRouter } from "next/router";

export default function PaymentsPage() {
  const { getUser } = useAccount();
  const { mutateAsync } = api.example.processPayment.useMutation();
  const router = useRouter();

  return (
    <main className={styles.payments}>
      <ClientNavbar />
      <div>
        <form
          className={styles.options}
          onSubmit={(e) => {
            e.preventDefault();
            mutateAsync({
              username: getUser() ?? "",
              months: Number(e.target[1].value),
            }).then(() => {
              void router.push("/user-panel");
            });
          }}
        >
          <label htmlFor="option">Wybierz plan</label>
          <select name="option" id="option">
            <option value="dt">Dieta + trening</option>
            <option value="t">Trening</option>
            <option value="d">Dieta</option>
          </select>
          <label htmlFor="option">Wybierz czas trwania</label>
          <select name="plan" id="plan">
            <option value="1">1 miesiąc</option>
            <option value="3">3 miesiące</option>
            <option value="6">6 miesięcy</option>
          </select>
          <button className="btn-default">Opłać</button>
        </form>
      </div>
    </main>
  );
}
