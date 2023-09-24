import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";
export const getClient = () => {
  // using the env i.e staging or master

  //1. import cf
  //2. use the cf client to get the environment
  //3. return an object with different accessTokens based on environments
  //3b. pass the token to apollo
  //4. check the vercel environment and put the environment name i.e CF_STAGING_ENV = "staging"

  let accessToken = "";

  const cfEnvironment = process.env.CONTENTFUL_BRANCH;

  if (cfEnvironment === "master") {
    accessToken = process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN!;
  } else if (cfEnvironment !== "master") {
    // this is for paid customers
    accessToken = process.env.NEXT_PUBLIC_STAGING_CONTENTFUL_ACCESS_TOKEN!;
  }

  if (!accessToken) {
    throw new Error(`${cfEnvironment} and  API AccessToken must be provided`);
  }

  const http = new HttpLink({
    uri: `https://graphql.contentful.com/content/v1/spaces/${process.env?.NEXT_PUBLIC_CONTENTFUL_SPACE_ID}`,
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  return new ApolloClient({
    cache: new InMemoryCache(),
    link: http,
  });
};
