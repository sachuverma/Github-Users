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
  const [requests, setRequests] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({ show: false, msg: "" });

  const searchGithubUser = async (user) => {
    toggleError();
    setLoading(true);

    const res = await axios(`${rootUrl}/users/${user}`).catch((err) =>
      console.log(err)
    );

    if (res) {
      setGithubUser(res.data);
      const { login, followers_url } = res.data;

      await Promise.allSettled([
        axios(`${rootUrl}/users/${login}/repos?per_page=100`),
        axios(`${followers_url}?per_page=100`),
      ]).then((results) => {
        const [repos, followers] = results;
        const status = "fulfilled";

        if (repos.status === status) setRepos(repos.value.data);

        if (followers.status === status)
          setGithubFollowers(followers.value.data);
      });

      /*
      https://api.github.com/users/sachuverma/repos?per_page=100

      https://api.github.com/users/sachuverma/followers
      */
    } else {
      toggleError(true, "No user with that username");
    }
    checkRequests();
    setLoading(false);
  };

  const checkRequests = () => {
    axios(`${rootUrl}/rate_limit`)
      .then(({ data }) => {
        let {
          rate: { remaining },
        } = data;

        setRequests(remaining);
        if (remaining === 0) {
          toggleError(true, "sorry, hourly API request limit reached");
        }
      })
      .catch((err) => console.log(err));
  };

  const toggleError = (show = false, msg = "") => {
    setError({ show, msg });
  };

  useEffect(checkRequests, []);

  return (
    <GithubContext.Provider
      value={{
        githubUser,
        repos,
        followers,
        error,
        requests,
        loading,
        searchGithubUser,
      }}
    >
      {children}
    </GithubContext.Provider>
  );
};

export { GithubContext, GithubProvider };
