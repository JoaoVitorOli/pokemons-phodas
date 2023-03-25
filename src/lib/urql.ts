import { ssrExchange, createClient, dedupExchange, cacheExchange, fetchExchange } from "urql";

const isServerSide = typeof window === undefined;

const ssrCache = ssrExchange({ 
  isClient: !isServerSide
});

const client = createClient({
  url: 'https://beta.pokeapi.co/graphql/v1beta',
  exchanges: [
    dedupExchange, 
    cacheExchange, 
    ssrCache, 
    fetchExchange
  ],
})

export { client }
