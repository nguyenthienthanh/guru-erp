import * as Yup from 'yup';
export declare const PASSWORD_MIN_LENGTH = 6;
export declare const PASSWORD_MAX_LENGTH = 128;
export declare const accountEmail: Yup.StringSchema;
export declare const accountPassword: Yup.StringSchema;
export declare const createAccountParams: Yup.ObjectSchema<Yup.Shape<{}, {
    email: string;
    password: string;
}>>;
export declare const signInParams: Yup.ObjectSchema<Yup.Shape<{}, {
    email: string;
    password: string;
}>>;
