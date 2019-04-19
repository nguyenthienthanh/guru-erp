"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_tag_1 = __importDefault(require("graphql-tag"));
const react_apollo_hooks_1 = require("react-apollo-hooks");
const CREATE_ORG = graphql_tag_1.default `
  mutation CreateOrg($name: String, $namespace: String) {
    createdOrg: createOrg(name: $name, namespace: $namespace) {
      id
      name
      namespace
    }
  }
`;
exports.useCreateOrgMutation = (opts) => react_apollo_hooks_1.useMutation(CREATE_ORG, opts);
//# sourceMappingURL=useCreateOrgMutation.js.map