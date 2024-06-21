import ClientNavbar from "~/components/ClientNavbar/ClientNavbar";
import styles from "./userpanel.module.scss";

export default function SurveyPage() {
  return (
    <main className={styles.survey}>
      <ClientNavbar />
      <div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            console.log(e.target);
          }}
        >
          <label htmlFor="age">Wiek</label>
          <input name="age" placeholder="Wiek"></input>
          <label htmlFor="weight">Waga (kg)</label>
          <input name="weight" placeholder="Waga"></input>
          <label htmlFor="height">Wzrost (cm)</label>
          <input name="height" placeholder="Wzrost"></input>
          <label htmlFor="activity">Dotychczasowa aktywność fizyczna</label>
          <select name="activity" id="activity">
            <option value="0">Brak</option>
            <option value="1">Niski</option>
            <option value="2">Średni</option>
            <option value="3">Wysoki</option>
          </select>
          <label htmlFor="goal">Cel</label>
          <select name="goal" id="goal">
            <option value="lose_weight">Schudnąć</option>
            <option value="improve_fitness">Poprawić kondycję</option>
            <option value="build_muscle">Zbudować mięśnie</option>
          </select>
          <label htmlFor="diet_additional">Uwagi do diety</label>
          <textarea
            name="diet_additional"
            placeholder="Dodatkowe uwagi dietetyczne, alergie, przyjmowane leki, preferencje dot. posiłków"
          ></textarea>
          <label htmlFor="training_additional">Uwagi do treningu</label>
          <textarea
            name="training_additional"
            placeholder="Dodatkowe uwagi treningowe, kontuzje, preferencje dot. ćwiczeń"
          ></textarea>
          <button className="btn-default">Zapisz preferencje</button>
        </form>
      </div>
    </main>
  );
}
