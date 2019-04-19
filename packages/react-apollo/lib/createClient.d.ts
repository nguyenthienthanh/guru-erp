import { ApolloClient } from 'apollo-client';
export interface CreateClientConfig {
    uri: string;
}
export declare const createClient: ({ uri }: CreateClientConfig, extraHeaders?: object) => ApolloClient<import("apollo-cache-inmemory").NormalizedCacheObject>;
