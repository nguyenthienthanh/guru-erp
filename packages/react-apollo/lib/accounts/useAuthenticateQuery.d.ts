import { QueryHookOptions } from 'react-apollo-hooks';
import { IAccount } from '@guru-erp/interfaces';
interface Data {
    account: {
        id: IAccount['id'];
        email: IAccount['email'];
        avatar: IAccount['avatar'];
    };
}
interface Variables {
}
export declare const useAuthenticateQuery: (opts?: QueryHookOptions<Data, Variables>) => import("react-apollo-hooks").QueryHookResult<Data, Variables>;
export {};
