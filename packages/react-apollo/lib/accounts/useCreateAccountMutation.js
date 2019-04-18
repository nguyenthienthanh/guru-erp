"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_tag_1 = __importDefault(require("graphql-tag"));
const react_apollo_hooks_1 = require("react-apollo-hooks");
const CREATE_ACCOUNT_MUTATION = graphql_tag_1.default `
  mutation CreateAccount($email: String!, $password: String!) {
    createAccount(email: $email, password: $password) {
      id
      email
    }
  }
`;
exports.useCreateAccountMutation = (opts) => react_apollo_hooks_1.useMutation(CREATE_ACCOUNT_MUTATION, opts);
//# sourceMappingURL=useCreateAccountMutation.js.map