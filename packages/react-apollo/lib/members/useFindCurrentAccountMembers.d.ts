import { IMember } from '@guru-erp/interfaces';
import { QueryHookOptions } from 'react-apollo-hooks';
interface Data {
    members: IMember[];
}
interface Variables {
}
export declare const useFindCurrentAccountMembers: (opts?: QueryHookOptions<Data, Variables>) => import("react-apollo-hooks").QueryHookResult<Data, Variables>;
export {};
