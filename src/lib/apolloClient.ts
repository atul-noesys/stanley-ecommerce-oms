import {
  ApolloClient,
  InMemoryCache,
  HttpLink,
  ApolloLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { onError } from "@apollo/client/link/error";
import { RetryLink } from "@apollo/client/link/retry";

// Retry link configuration
const retryLink = new RetryLink({
  delay: {
    initial: 300,
    max: 10000,
    jitter: true,
  },
  attempts: {
    max: 2,
    retryIf: (error) => !!error,
  },
});

// HTTP link configuration
const httpLink = new HttpLink({
  uri: "/api/graphql",
  credentials: "include", // Include cookies in requests
});

// Auth link - inject token into headers
const authLink = setContext(async (_, { headers }) => {
  let token = null;

  if (typeof window !== "undefined") {
    token = localStorage.getItem("access_token");
  }

  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});
// Error link - handle errors
const errorLink = onError((error: any) => {
  const { graphQLErrors, networkError } = error;

  if (graphQLErrors) {
    graphQLErrors.forEach((err: any) => {
      console.error(`[GraphQL error]: ${err.message}`, err);

      if ((err.extensions?.code as string) === "UNAUTHENTICATED") {
        // Redirect to login on unauthorized
        if (typeof window !== "undefined") {
          window.location.href = "/login";
        }
      }
    });
  }

  if (networkError) {
    console.error("[Network error]:", networkError);

    if ("statusCode" in networkError && networkError.statusCode === 401) {
      // Unauthorized - redirect to login
      if (typeof window !== "undefined") {
        window.location.href = "/login";
      }
    }
  }
});

// Apollo Client configuration
const client = new ApolloClient({
  link: ApolloLink.from([errorLink, retryLink, authLink.concat(httpLink)]),
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          products: {
            merge(_existing, incoming) {
              return incoming;
            },
          },
          product: {
            merge(_existing, incoming) {
              return incoming;
            },
          },
        },
      },
    },
  }),
  defaultOptions: {
    watchQuery: {
      fetchPolicy: "cache-and-network",
    },
    query: {
      fetchPolicy: "cache-first",
    },
  },
});

// Enable Apollo DevTools in development
if (typeof window !== "undefined" && process.env.NODE_ENV === "development") {
  (window as any).__APOLLO_CLIENT__ = client;
}

export default client;
