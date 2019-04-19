import * as Yup from 'yup';
export declare const orgId: Yup.StringSchema;
export declare const orgName: Yup.StringSchema;
export declare const orgNamespace: Yup.StringSchema;
export declare const createOrgParams: Yup.ObjectSchema<Yup.Shape<{}, {
    name: string;
    namespace: string;
}>>;
export declare const findOrgByIdOrNamespaceParams: Yup.ObjectSchema<{
    namespace: string;
    id: string;
}>;
