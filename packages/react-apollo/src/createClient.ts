import { InMemoryCache } from 'apollo-cache-inmemory'
import { ApolloClient } from 'apollo-client'
import { ApolloLink } from 'apollo-link'
import { setContext } from 'apollo-link-context'
import { onError } from 'apollo-link-error'
import { HttpLink } from 'apollo-link-http'
// tslint:disable-next-line:import-name

export interface CreateClientConfig {
  uri: string
}

const headersLink = (extraHeaders: any = {}) =>
  setContext((_, { headers = {} }) => {
    return {
      headers: { ...headers, ...extraHeaders },
    }
  })

export const createClient = ({ uri }: CreateClientConfig, extraHeaders: object = {}) => {
  const client = new ApolloClient({
    link: ApolloLink.from([
      headersLink(extraHeaders),
      onError(({ graphQLErrors, networkError }) => {
        if (graphQLErrors) {
          graphQLErrors.map(({ message, locations, path }) =>
            console.log(
              `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`,
            ),
          )
        }
        if (networkError) console.log(`[*Network error]: ${networkError}`)
      }),
      new HttpLink({
        uri,
        credentials: 'same-origin',
      }),
    ]),
    cache: new InMemoryCache(),
  })

  return client
}
