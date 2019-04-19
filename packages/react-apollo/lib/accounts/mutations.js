"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_tag_1 = __importDefault(require("graphql-tag"));
exports.SIGN_IN_MUTATION = graphql_tag_1.default `
  mutation SignIn($email: String!, $password: String!) {
    signIn(email: $email, password: $password)
  }
`;
//# sourceMappingURL=mutations.js.map