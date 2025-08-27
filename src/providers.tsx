import { HttpLink } from "@apollo/client";
import { InMemoryCache } from "@apollo/client";
import { ApolloClient } from "@apollo/client";
import { ApolloProvider } from "@apollo/client/react";
import type { ReactNode } from "react";
import { useState } from "react";

export const Providers = ({ children }: { children: ReactNode }) => {
  const [apolloClient] = useState(
    () =>
      new ApolloClient({
        link: new HttpLink({
          uri: "https://api.platform.opentargets.org/api/v4/graphql",
        }),
        cache: new InMemoryCache(),
      })
  );

  return <ApolloProvider client={apolloClient}>{children}</ApolloProvider>;
};
