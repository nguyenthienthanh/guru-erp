"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_cache_inmemory_1 = require("apollo-cache-inmemory");
const apollo_client_1 = require("apollo-client");
const apollo_link_1 = require("apollo-link");
const apollo_link_context_1 = require("apollo-link-context");
const apollo_link_error_1 = require("apollo-link-error");
const apollo_link_http_1 = require("apollo-link-http");
const headersLink = (extraHeaders = {}) => apollo_link_context_1.setContext((_, { headers = {} }) => {
    return {
        headers: Object.assign({}, headers, extraHeaders),
    };
});
exports.createClient = ({ uri }, extraHeaders = {}) => {
    const client = new apollo_client_1.ApolloClient({
        link: apollo_link_1.ApolloLink.from([
            headersLink(extraHeaders),
            apollo_link_error_1.onError(({ graphQLErrors, networkError }) => {
                if (graphQLErrors) {
                    graphQLErrors.map(({ message, locations, path }) => console.log(`[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`));
                }
                if (networkError)
                    console.log(`[*Network error]: ${networkError}`);
            }),
            new apollo_link_http_1.HttpLink({
                uri,
                credentials: 'same-origin',
            }),
        ]),
        cache: new apollo_cache_inmemory_1.InMemoryCache(),
    });
    return client;
};
//# sourceMappingURL=createClient.js.map