import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";
import "./style/global.scss";
import { AuthProvider } from "./auth/AuthProvider";
import { DbProvider } from "./db/DbProvider";
import { newTheme } from "./style/theme";

ReactDOM.render(
  <ChakraProvider theme={newTheme}>
    <BrowserRouter>
      <AuthProvider>
        <DbProvider>
          <App />
        </DbProvider>
      </AuthProvider>
    </BrowserRouter>
  </ChakraProvider>,
  document.getElementById("root")
);
