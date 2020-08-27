import React from "react";
import logo from "./logo.svg";
import "./App.css";

import { QueryRenderer } from "react-relay";
import graphql from "babel-plugin-relay/macro";

import environment from "./relay-env";

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
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
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
    </div>
  );
}

export default App;
