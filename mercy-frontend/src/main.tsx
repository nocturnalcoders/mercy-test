import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { Home } from "./Home.tsx";
import "./index.css";
import { store } from "./hooks/store.ts";
import NftInstallPlugin from "./components/Installer.tsx";

const AppComponent = () => {
  if (window.ethereum) {
    return <Home />;
  } else {
    return <NftInstallPlugin />;
  }
};
ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <AppComponent />
    </Provider>
  </React.StrictMode>
);
