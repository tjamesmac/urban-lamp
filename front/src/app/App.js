import React from "react";
import logo from "./logo.svg";

import { QueryRenderer } from "react-relay";
import graphql from "babel-plugin-relay/macro";

import environment from "../relay-env";

import { AppContainer, AppLogo, AppHeader, AppLink } from "./style";

const query = graphql`
  query AppQuery {
    repositoryOwner(login: "tjamesmac") {
      repositories(last: 10) {
        edges {
          node {
            name
            url
            createdAt
            languages(first: 5) {
              edges {
                size
                node {
                  color
                  name
                }
              }
            }
            labels(first: 5) {
              edges {
                node {
                  name
                }
              }
            }
          }
        }
      }
    }
  }
`;

function App() {
  return (
    <AppContainer>
      <AppHeader className="App-header">
        <AppLogo src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <AppLink
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </AppLink>
      </AppHeader>
      <QueryRenderer
        environment={environment}
        query={query}
        variables={{}}
        render={({ error, props }) => {
          if (error) {
            return <div>Error!</div>;
          }
          if (!props) {
            return <div>Loading...</div>;
          }
          console.log(props);
          return <div>User ID:</div>;
        }}
      />
    </AppContainer>
  );
}

export default App;
