import { type Session } from "next-auth";
import { type AppType } from "next/app";
import { api } from "~/utils/api";
import "~/styles/globals.scss";
import { createTheme, MantineProvider } from "@mantine/core";
import "@mantine/core/styles.css";
import "dayjs/locale/pl";
import "@mantine/tiptap/styles.css";
import "@mantine/dates/styles.css";
import { DatesProvider } from "@mantine/dates";
import Head from "next/head";

const theme = createTheme({
  /** Your theme override here */
});

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <MantineProvider theme={theme}>
      <DatesProvider settings={{ locale: "pl" }}>
        <Head>
          <title>FitMomentum</title>
        </Head>
        <Component {...pageProps} />
      </DatesProvider>
    </MantineProvider>
  );
};

export default api.withTRPC(MyApp);
