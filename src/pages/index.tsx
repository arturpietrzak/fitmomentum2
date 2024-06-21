import styles from "./index.module.scss";
import { signIn, signOut, useSession } from "next-auth/react";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import Navbar from "~/components/Navbar/Navbar";
import { api } from "~/utils/api";

export default function Home() {
  return (
    <>
      <main className={styles.main}>
        <Navbar />
        <header className={styles.header}>
          <div className={styles.textContainer}>
            <div className={styles.title}>
              Zadbaj o siebie z pomocą naszych specjalistów!
            </div>
            <div className={styles.subtitle}>
              Razem zbudujemy w Tobie zdrowe nawyki, aby zagwarantować Ci efekty
              metamorfozy na zawsze - bez efektu jojo. W osiągnięciu wymarzonych
              celów sylwetkowych pomoże ci zespół doświadczonych trenerów i
              dietetyków.
            </div>
            <div className={styles.credentialsList}>
              <div className={styles.credential}>
                <div className={styles.credentialTitle}>20 lat</div>
                <div className={styles.credentialSubtitle}>doświadczenia</div>
              </div>
              <div className={styles.credential}>
                <div className={styles.credentialTitle}>5000+</div>
                <div className={styles.credentialSubtitle}>
                  zadowolonych klientów
                </div>
              </div>
              <div className={styles.credential}>
                <div className={styles.credentialTitle}>ponad 30</div>
                <div className={styles.credentialSubtitle}>
                  wyszkolonych specjalistów
                </div>
              </div>
            </div>
          </div>
          <Image
            className={styles.bowlImage}
            src="/bowl.png"
            height={500}
            width={500}
            alt="Bowl"
          />
        </header>
        <div className={styles.container}>
          <div className={styles.aboutUs}>
            <h2>O nas</h2>
            <p className={styles.text}>
              FitMomentum to miejsce, gdzie codziennie rozprawiamy się ze
              zbędnymi kilogramami. Nasz zespół doświadczonych specjalistów
              pomoże Ci osiągnąć wymarzoną sylwetkę, poprawić stan zdrowia i
              nauczy cię zdrowych nawyków. Tak jak lubisz. Bez wyrzeczeń i
              stresu.
            </p>
            <div className={styles.images}>
              <Image
                className={styles.foodImage}
                src="/food1.jpg"
                width={500}
                height={500}
                alt="Food"
              />{" "}
              <Image
                className={styles.foodImage}
                src="/food2.jpg"
                width={500}
                height={500}
                alt="Food"
              />{" "}
              <Image
                className={styles.foodImage}
                src="/food3.jpg"
                width={500}
                height={500}
                alt="Food"
              />
            </div>
          </div>
          <div className={styles.offerContainer}>
            <h2>Nasza oferta</h2>
            <div className={styles.offers}>
              <OfferShowcase
                name={"Dieta"}
                price={59.99}
                includes={[
                  "Dieta dostosowana do Ciebie",
                  "Kontakt ze specjalistą",
                  "Lista zakupów",
                ]}
              />{" "}
              <OfferShowcase
                name={"Dieta + Trening"}
                price={99.99}
                includes={[
                  "Dieta dostosowana do Ciebie",
                  "Kontakt ze specjalistą",
                  "Lista zakupów",
                  "Indywidualny plan treningowy",
                  "Atlas ćwiczeń",
                  "Dziennik treningowy",
                ]}
              />{" "}
              <OfferShowcase
                name={"Trening"}
                price={49.99}
                includes={[
                  "Indywidualny plan treningowy",
                  "Atlas ćwiczeń",
                  "Dziennik treningowy",
                ]}
              />
            </div>
          </div>
          <div className={styles.contactSection}>
            <h2>Kontakt</h2>
            <div className={styles.contact}>
              <p>Potrzebujesz pomocy? Napisz do nas!</p>
              <div className={styles.input}>
                <input placeholder="Twój adres email"></input>
                <textarea placeholder="Twoja wiadomość"></textarea>
                <button className={styles.send}>Wyślij</button>
              </div>
            </div>
          </div>
        </div>
        <footer className={styles.footer}>
          <div className={styles.footerContainer}>
            <div className={styles.footerInfo}>
              FitMomentum to miejsce, gdzie codziennie rozprawiamy się ze
              zbędnymi kilogramami. Nasz zespół doświadczonych specjalistów
              pomoże Ci osiągnąć wymarzoną sylwetkę, poprawić stan zdrowia i
              nauczy cię zdrowych nawyków. Tak jak lubisz. Bez wyrzeczeń i
              stresu.
            </div>
            <div className={styles.footerColumn}>
              <div className={styles.footerHeader}>Informacje</div>
              <div>
                <Link href="/polityka-prywatnosci.pdf">
                  Polityka prywatności
                </Link>
              </div>
              <div>
                <Link href="/regulamin.pdf">Regulamin serwisu</Link>
              </div>
              <div>
                <Link href="/login">Moje konto</Link>
              </div>
              <div>
                <Link href="/login">Transakcje</Link>
              </div>
            </div>
            <div className={styles.footerColumn}>
              <div className={styles.footerHeader}>Wsparcie</div>
              <div>FAQ</div>
              <div>Zgłoś problem</div>
            </div>
          </div>
          <div className={styles.copyright}>2024 FitMomentum</div>
        </footer>
      </main>
    </>
  );
}

function OfferShowcase({
  name,
  price,
  includes,
}: {
  name: string;
  price: number;
  includes: string[];
}) {
  return (
    <div className={styles.offerShowcase}>
      <div className={styles.name}>{name}</div>
      <div className={styles.price}>{price}zł / msc</div>
      {includes.map((item) => (
        <div className={styles.includedItem} key={item}>
          {item}
        </div>
      ))}
    </div>
  );
}
