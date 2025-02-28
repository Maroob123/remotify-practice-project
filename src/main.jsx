import { forwardRef, StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { Link as RouterLink } from "react-router";
import { persistor, store } from "./redux/store.js";
import { PersistGate } from "redux-persist/integration/react";
import { Provider } from "react-redux";

const queryClient = new QueryClient();

const LinkBehavior = forwardRef((props, ref) => {
  const { href, ...other } = props;
  // Map href (Material UI) -> to (react-router)
  return <RouterLink ref={ref} to={href} {...other} />;
});

const theme = createTheme({
  palette: {
    primary: {
      main: "#532A21",
      contrastText: "#fff",
    },
    secondary: {
      main: "#f5f5f5",
      contrastText: "#000",
    },
  },
  typography: {
    button: {
      fontWeight: 600,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderWidth: 2,
        },
      },
    },
    MuiButtonBase: {
      defaultProps: {
        LinkComponent: LinkBehavior,
      },
    },
    MuiLink: {
      defaultProps: {
        component: LinkBehavior,
      },
    },
    MuiChip: {
      styleOverrides: {
        outlined: {
          borderWidth: 2,
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          "& .MuiOutlinedInput-root": {
            "& fieldset": {
              borderWidth: 2, // Increase the border width
            },
          },
        },
      },
      defaultProps: {
        InputLabelProps: { shrink: true, notched: true },
      },
    },
    MuiSelect: {
      styleOverrides: {
        root: {
          "& fieldset": {
            borderWidth: "2px", // Set border width
          },
        },
      },
    },
    MuiInputLabel: {
      defaultProps: {
        shrink: true,
        notched: true,
        sx: {
          fontSize: 18,
          fontWeight: 500,
          backgroundColor: "inherit",
          padding: "0 4px",
        },
      },
    },
    MuiOutlinedInput: {
      defaultProps: {
        shrink: true,
        notched: true,
        sx: {
          fontSize: 18,
        },
      },
    },
    MuiCheckbox: {
      defaultProps: {
        sx: {
          p: "5px",
        },
      },
    },
  },
});

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <QueryClientProvider client={queryClient}>
            <App />
          </QueryClientProvider>
        </PersistGate>
      </Provider>
    </ThemeProvider>
  </StrictMode>
);
