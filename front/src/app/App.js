import React from "react";
import logo from "./logo.svg";

import { QueryRenderer } from "react-relay";
import graphql from "babel-plugin-relay/macro";

import environment from "../relay-env";

import { AppContainer, AppLogo, AppHeader, AppLink } from "./style";

const query = graphql`
  query AppQuery {
    repositoryOwner(login: "tjamesmac") {
      repositories(last: 5) {
        edges {
          node {
            name
            url
            createdAt
            defaultBranchRef {
              name
              repository {
                name
              }
              target {
                abbreviatedOid
                commitResourcePath
                commitUrl
                oid
                ... on Commit {
                  history(first: 10) {
                    edges {
                      node {
                        author {
                          name
                          email
                        }
                        changedFiles
                        message
                        tree {
                          entries {
                            name
                            object {
                              ... on Tree {
                                entries {
                                  name
                                  object {
                                    ... on Tree {
                                      entries {
                                        name
                                        object {
                                          ... on Tree {
                                            entries {
                                              name
                                              object {
                                                ... on Blob {
                                                  byteSize
                                                  text
                                                }
                                              }
                                            }
                                          }
                                        }
                                      }
                                    }
                                  }
                                }
                              }
                              ... on Blob {
                                byteSize
                                text
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
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
      <AppHeader>
        <AppLogo src={logo} alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <AppLink
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
          console.log(props.repositoryOwner.repositories);
          return props.repositoryOwner.repositories.edges.map((item, index) => (
            <p key={index}>{item.node.name}</p>
          ));
        }}
      />
    </AppContainer>
  );
}

export default App;
