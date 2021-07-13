import React, { useState, useEffect } from "react";
import Routes from "./routes";
import "react-toastify/dist/ReactToastify.css";

import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import { ptBR } from "@material-ui/core/locale";

const App = () => {
  const [locale, setLocale] = useState();
  const ticketAllowance = 5;
  const FIVE_MINUTES = 5 * 60000;

  const theme = createMuiTheme(
    {
      scrollbarStyles: {
        "&::-webkit-scrollbar": {
          width: "8px",
          height: "8px",
        },
        "&::-webkit-scrollbar-thumb": {
          boxShadow: "inset 0 0 6px rgba(0, 0, 0, 0.3)",
          backgroundColor: "#e8e8e8",
        },
      },
      palette: {
        primary: { main: "#530D6C" },
      },
    },
    locale
  );

  useEffect(() => {
    if (!localStorage.getItem("ticketAllowance")) {
      localStorage.setItem("ticketAllowance", `${ticketAllowance}`);
    }

    if (!localStorage.getItem("ticketTimerElapsed")) {
      localStorage.setItem("ticketTimerElapsed", "0");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      const currTime = parseInt(localStorage.getItem("ticketTimerElapsed"));

      if (localStorage.getItem("ticketAllowance") === "0") {
        localStorage.setItem("ticketTimerElapsed", `${currTime + 1000}`);
      }

      if (currTime >= FIVE_MINUTES) {
        localStorage.setItem("ticketTimerElapsed", "0");
        localStorage.setItem("ticketAllowance", `${ticketAllowance}`);
      }
    }, 1000);

    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const i18nlocale = localStorage.getItem("i18nextLng");
    const browserLocale =
      i18nlocale.substring(0, 2) + i18nlocale.substring(3, 5);

    if (browserLocale === "ptBR") {
      setLocale(ptBR);
    }
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <Routes />
    </ThemeProvider>
  );
};

export default App;
