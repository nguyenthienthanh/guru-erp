import * as Yup from 'yup';
export declare const memberId: Yup.StringSchema;
export declare const username: Yup.StringSchema;
export declare const membership: Yup.StringSchema;
export declare const createMemberParams: Yup.ObjectSchema<Yup.Shape<{}, {
    orgId: string;
    accountId: string;
    membership: string;
    username: string;
}>>;
export declare const updateMemberRolesParams: Yup.ObjectSchema<Yup.Shape<{}, {
    memberId: string;
    roles: string[];
}>>;
export declare const findMembersByAccountIdParams: Yup.ObjectSchema<Yup.Shape<{}, {
    accountId: string;
}>>;
