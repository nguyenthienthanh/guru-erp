import { MutationHookOptions } from 'react-apollo-hooks';
interface Data {
    signIn: string;
}
interface Variables {
    email: string;
    password: string;
}
export declare const useSignInMutation: (opts?: MutationHookOptions<Data, Variables, object>) => import("react-apollo-hooks").MutationFn<Data, Variables>;
export {};
