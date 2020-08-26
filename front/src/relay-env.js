import { Environment, Network, RecordSource, Store } from "relay-runtime";

const url = "https://api.github.com/graphql";

function fetchQuery(operation, variables) {
  return fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer 7338b091e249bf6ca4f44120253d3378dde6c7df",
    },
    body: JSON.stringify({
      query: operation.text,
      variables,
    }),
  }).then((response) => {
    console.log(response.json());
    return response.json();
  });
}

const environment = new Environment({
  network: Network.create(fetchQuery),
  store: new Store(new RecordSource()),
});

export default environment;
