import { ApolloClient } from "apollo-client";
import { HttpLink } from "apollo-link-http";
import { InMemoryCache, NormalizedCacheObject } from "apollo-cache-inmemory";
import { persistCache } from "apollo-cache-persist";
import { PersistentStorage, PersistedData } from "apollo-cache-persist/types";

export async function setupClient() {
  const cache = new InMemoryCache();
  const LocalS = window.localStorage as PersistentStorage<
    PersistedData<NormalizedCacheObject>
  >;
  await persistCache({
    cache,
    storage: LocalS,
    trigger: "write",
    debug: true
  });

  const client = new ApolloClient({
    link: new HttpLink({
      uri: "http://wolf.test/graphql"
    }),
    cache
  });

  return client;
}
