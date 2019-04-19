import { IOrg } from '@guru-erp/interfaces';
import { MutationHookOptions } from 'react-apollo-hooks';
interface Data {
    createdOrg: {
        id: IOrg['id'];
        name: IOrg['name'];
        namespace: IOrg['namespace'];
    };
}
interface Variables {
}
export declare const useCreateOrgMutation: (opts?: MutationHookOptions<Data, Variables, object>) => import("react-apollo-hooks").MutationFn<Data, Variables>;
export {};
