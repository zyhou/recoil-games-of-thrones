import React from "react";
import ReactDOM from "react-dom";
import { RecoilRoot } from "recoil";

import App from "./App";

if (process.env.NODE_ENV === "test") {
  const { worker } = require("./mocks/browser");
  worker.start();
}

ReactDOM.render(
  <React.StrictMode>
    <RecoilRoot>
      <App />
    </RecoilRoot>
  </React.StrictMode>,
  document.getElementById("root")
);
