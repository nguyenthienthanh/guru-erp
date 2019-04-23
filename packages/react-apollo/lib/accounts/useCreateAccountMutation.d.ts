import { MutationHookOptions } from 'react-apollo-hooks';
import { IAccount } from '@guru-erp/interfaces';
interface Data {
    createdAccount: {
        id: IAccount['id'];
        email: IAccount['email'];
    };
}
interface Variables {
    email: string;
    password: string;
}
export declare const useCreateAccountMutation: (opts?: MutationHookOptions<Data, Variables, object>) => import("react-apollo-hooks").MutationFn<Data, Variables>;
export {};
