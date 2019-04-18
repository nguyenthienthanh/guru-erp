"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_tag_1 = __importDefault(require("graphql-tag"));
const react_apollo_hooks_1 = require("react-apollo-hooks");
const SIGN_IN_MUTATION = graphql_tag_1.default `
  mutation SignIn($email: String!, $password: String!) {
    signIn(email: $email, password: $password)
  }
`;
exports.useSignInMutation = (opts) => react_apollo_hooks_1.useMutation(SIGN_IN_MUTATION, opts);
//# sourceMappingURL=useSignInMutation.js.map