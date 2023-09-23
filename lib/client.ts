import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";

export const getClient = () => {
  const http = new HttpLink({
    uri: `https://graphql.contentful.com/content/v1/spaces/${process.env?.NEXT_PUBLIC_CONTENTFUL_SPACE_ID}`,
    headers: {
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN}`,
    },
  });
  return new ApolloClient({
    cache: new InMemoryCache(),
    link: http,
  });
};
