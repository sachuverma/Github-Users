import React, { useState, useEffect } from "react";
import axios from "axios";

import mockUser from "./mockData.js/mockUser";
import mockRepos from "./mockData.js/mockRepos";
import mockFollowers from "./mockData.js/mockFollowers";

const rootUrl = "https://api.github.com";

const GithubContext = React.createContext();

// Provider, Consumer - GithubContext.Provider

const GithubProvider = ({ children }) => {
  const [githubUser, setGithubUser] = useState(mockUser);
  const [repos, setRepos] = useState(mockRepos);
  const [followers, setGithubFollowers] = useState(mockFollowers);

  return (
    <GithubContext.Provider value={{ githubUser, repos, followers }}>
      {children}
    </GithubContext.Provider>
  );
};

export { GithubContext, GithubProvider };
