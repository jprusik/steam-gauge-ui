import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import "i18n";
import "./styles/index.scss";
import { App } from "./App";

const darkTheme = createTheme({
  // Globally disable MUI transitions
  transitions: { create: () => "none" },
  palette: {
    mode: "dark",
    background: {
      default: "#0A1929",
    },
    warning: {
      main: "#FFC107",
      dark: "#EEB400",
    },
    info: {
      main: "#2086D7",
      dark: "#1769AA",
    },
  },
});

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement,
);

// Note: the use of `StrictMode` in React 18 will cause fetch to fire twice on mount when
root.render(
  <StrictMode>
    <ThemeProvider theme={darkTheme}>
      <App />
    </ThemeProvider>
  </StrictMode>,
);
