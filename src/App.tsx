import { useState, useCallback } from "react";
import {
  Container,
  createTheme,
  CssBaseline,
  type Theme,
  ThemeProvider,
  Box,
} from "@mui/material";
import { SnackbarProvider } from "notistack";

import DialogDisclaimer from "./components/DialogDisclaimer";
import Form from "./components/Form";

import "./App.css";

interface EmailParameters {
  pdf: Uint8Array;
  userEmail: string;
}

/**
 *
 * @returns JSX.Element
 */
export default function App() {
  /**
   * Theme object
   */
  const THEME: Theme = createTheme({
    typography: {
      fontFamily: `"Montserrat"`,
      fontSize: 15,
      fontWeightLight: 500,
      fontWeightRegular: 500,
      fontWeightMedium: 900,
    },
  });

  return (
    <ThemeProvider theme={THEME}>
      <CssBaseline />
      <SnackbarProvider maxSnack={3}>
        <Box
          sx={{ width: { xs: "100%", sm: "50%", md: "450px" }, px: 5, pt: 1 }}
        >
          <img
            src="https://assets.cdn.filesafe.space/6ltD4tW4ej1bPro4eqCz/media/63dea2bbdea9bc4f59fa58ab.png"
            height="auto"
            width="100%"
          ></img>
        </Box>
        <Body />
      </SnackbarProvider>
    </ThemeProvider>
  );
}

/**
 *
 * @returns JSX.Element
 */
function Body() {
  const [emailParameters, setEmailParameters] = useState<EmailParameters>();

  /**
   * Handler to close dialog
   */
  const handleDialogClose = () => {
    setEmailParameters(undefined);
  };

  /**
   * Handler to change PDF bytes
   */
  const handlePdfChange = useCallback((params: EmailParameters) => {
    setEmailParameters(params);
  }, []);

  return (
    <>
      {emailParameters?.pdf && emailParameters?.userEmail && (
        <DialogDisclaimer
          userEmail={emailParameters.userEmail}
          pdf={emailParameters.pdf}
          onClose={handleDialogClose}
        />
      )}
      <Box
        sx={{
          backgroundColor: "rgba(0,0,0,0)",
          overflowY: "scroll",
          maxHeight: "100vh",
          pb: 15,
        }}
      >
        <Container>
          <Form onPdfSubmit={handlePdfChange} />
        </Container>
      </Box>
    </>
  );
}
