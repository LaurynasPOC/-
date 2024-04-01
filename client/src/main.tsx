import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { Provider } from "react-redux";
import { store } from "./state/store.ts";
import AlertContainer from "./components/alerts/AlertsToaster.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <AlertContainer />
      <App />
    </Provider>
  </React.StrictMode>
);
