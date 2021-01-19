import React from "react";
import ReactDOM from "react-dom";
import * as serviceWorker from "./serviceWorker";
import { Auth0Provider } from "@auth0/auth0-react";

import "./index.css";
import App from "./App";

import { GithubProvider } from "./context/context";

/*

github-users-auth.us.auth0.com

Ha3OKPwor2JwJu5tdI517TGkO02Z5sZF

*/

ReactDOM.render(
  <React.StrictMode>
    <Auth0Provider
      domain="github-users-auth.us.auth0.com"
      clientId="Ha3OKPwor2JwJu5tdI517TGkO02Z5sZF"
      redirectUri={window.location.origin}
      cacheLocation="localstorage"
    >
      <GithubProvider>
        <App />
      </GithubProvider>
    </Auth0Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
