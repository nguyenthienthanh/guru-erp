"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_tag_1 = __importDefault(require("graphql-tag"));
const react_apollo_hooks_1 = require("react-apollo-hooks");
const AUTHENTICATE_QUERY = graphql_tag_1.default `
  query Authenticate {
    authenticate {
      id
      email
      avatar
    }
  }
`;
exports.useAuthenticateQuery = (opts) => react_apollo_hooks_1.useQuery(AUTHENTICATE_QUERY, opts);
//# sourceMappingURL=useAuthenticateQuery.js.map