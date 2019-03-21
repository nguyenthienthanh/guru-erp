export class AddArgumentsAsVariables {
  constructor(schema: any, args: any);
  schema: any;
  args: any;
  transformRequest(originalRequest: any): any;
}
export class AddTypenameToAbstract {
  constructor(targetSchema: any);
  targetSchema: any;
  transformRequest(originalRequest: any): any;
}
export class ApolloError {
  static captureStackTrace(p0: any, p1: any): any;
  static prepareStackTrace: any;
  static stackTraceLimit: number;
  constructor(message: any, code: any, properties: any);
  extensions: any;
}
export class ApolloServer {
  createGraphQLServerOptions(req: any, res: any): any;
  createHandler({ path, disableHealthCheck, onHealthCheck, }: any): any;
  ensurePluginInstantiation(plugins: any): void;
  executeOperation(request: any): any;
  graphQLServerOptions(integrationContextArgument: any): any;
  initializeDocumentStore(): void;
  installSubscriptionHandlers(server: any): void;
  setGraphQLPath(path: any): void;
  stop(): any;
  supportsSubscriptions(): any;
  supportsUploads(): any;
  willStart(): any;
}
export function ApolloService(mixinOptions: any): any;
export class AuthenticationError {
  static captureStackTrace(p0: any, p1: any): any;
  static prepareStackTrace: any;
  static stackTraceLimit: number;
  constructor(message: any);
}
export class CheckResultAndHandleErrors {
  constructor(info: any, fieldName: any);
  info: any;
  fieldName: any;
  transformResult(result: any): any;
}
export class ExpandAbstractTypes {
  constructor(transformedSchema: any, targetSchema: any);
  targetSchema: any;
  mapping: any;
  reverseMapping: any;
  transformRequest(originalRequest: any): any;
}
export class ExtractField {
  constructor(_a: any);
  from: any;
  to: any;
  transformRequest(originalRequest: any): any;
}
export class FilterRootFields {
  constructor(filter: any);
  transformer: any;
  transformSchema(originalSchema: any): any;
}
export class FilterToSchema {
  constructor(targetSchema: any);
  targetSchema: any;
  transformRequest(originalRequest: any): any;
}
export class FilterTypes {
  constructor(filter: any);
  filter: any;
  transformSchema(schema: any): any;
}
export class ForbiddenError {
  static captureStackTrace(p0: any, p1: any): any;
  static prepareStackTrace: any;
  static stackTraceLimit: number;
  constructor(message: any);
}
export class GraphQLExtension {
}
export const GraphQLUpload: {
  astNode: any;
  description: string;
  extensionASTNodes: any;
  inspect: Function;
  name: string;
  parseLiteral: Function;
  parseValue: Function;
  serialize: Function;
  toJSON: Function;
};
export class MockList {
  constructor(len: any, wrappedFunction: any);
  len: any;
  wrappedFunction: any;
  mock(root: any, args: any, context: any, info: any, fieldType: any, mockTypeFunc: any): any;
  randint(low: any, high: any): any;
}
export class RenameRootFields {
  constructor(renamer: any);
  transformer: any;
  transformSchema(originalSchema: any): any;
}
export class RenameTypes {
  constructor(renamer: any, options: any);
  renamer: any;
  reverseMap: any;
  renameBuiltins: any;
  renameScalars: any;
  renameTypes(value: any, name: any): any;
  transformRequest(originalRequest: any): any;
  transformResult(result: any): any;
  transformSchema(originalSchema: any): any;
}
export class ReplaceFieldWithFragment {
  constructor(targetSchema: any, fragments: any);
  targetSchema: any;
  mapping: any;
  transformRequest(originalRequest: any): any;
}
export class SchemaDirectiveVisitor {
  static getDeclaredDirectives(schema: any, directiveVisitors: any): any;
  static getDirectiveDeclaration(directiveName: any, schema: any): any;
  static implementsVisitorMethod(methodName: any): any;
  static visitSchemaDirectives(schema: any, directiveVisitors: any, context: any): any;
  constructor(config: any);
  visitArgumentDefinition(argument: any, details: any): void;
  visitEnum(type: any): void;
  visitEnumValue(value: any, details: any): void;
  visitFieldDefinition(field: any, details: any): void;
  visitInputFieldDefinition(field: any, details: any): void;
  visitInputObject(object: any): void;
  visitInterface(iface: any): void;
  visitObject(object: any): void;
  visitScalar(scalar: any): void;
  visitSchema(schema: any): void;
  visitUnion(union: any): void;
}
export function SchemaError(message: any): any;
export namespace SchemaError {
  function captureStackTrace(p0: any, p1: any): any;
  const prepareStackTrace: any;
  const stackTraceLimit: number;
}
export class SyntaxError {
  static captureStackTrace(p0: any, p1: any): any;
  static prepareStackTrace: any;
  static stackTraceLimit: number;
  constructor(message: any);
}
export class TransformRootFields {
  constructor(transform: any);
  transform: any;
  transformSchema(originalSchema: any): any;
}
export class UserInputError {
  static captureStackTrace(p0: any, p1: any): any;
  static prepareStackTrace: any;
  static stackTraceLimit: number;
  constructor(message: any, properties: any);
}
export class ValidationError {
  static captureStackTrace(p0: any, p1: any): any;
  static prepareStackTrace: any;
  static stackTraceLimit: number;
  constructor(message: any);
}
export class WrapQuery {
  constructor(path: any, wrapper: any, extractor: any);
  path: any;
  wrapper: any;
  extractor: any;
  transformRequest(originalRequest: any): any;
  transformResult(originalResult: any): any;
}
export function addCatchUndefinedToSchema(schema: any): void;
export function addErrorLoggingToSchema(schema: any, logger: any): void;
export function addMockFunctionsToSchema(_a: any): void;
export function addResolveFunctionsToSchema(options: any, legacyInputResolvers: any, legacyInputValidationOptions: any): any;
export function addSchemaLevelResolveFunction(schema: any, fn: any): void;
export function assertResolveFunctionsPresent(schema: any, resolverValidationOptions: any): void;
export function attachConnectorsToContext(...args: any[]): any;
export function attachDirectiveResolvers(schema: any, directiveResolvers: any): void;
export function buildSchemaFromTypeDefinitions(typeDefinitions: any, parseOptions: any): any;
export function chainResolvers(resolvers: any): any;
export function checkForResolveTypeResolver(schema: any, requireResolversForResolveType: any): void;
export function concatenateTypeDefs(typeDefinitionsAry: any, calledFunctionRefs: any): any;
export function decorateWithLogger(fn: any, logger: any, hint: any): any;
export function defaultCreateRemoteResolver(fetcher: any): any;
export function defaultMergedResolver(parent: any, args: any, context: any, info: any): any;
export const defaultPlaygroundOptions: {
  settings: {
    "editor.cursorShape": string;
    "editor.fontFamily": string;
    "editor.fontSize": number;
    "editor.reuseHeaders": boolean;
    "editor.theme": string;
    "general.betaUpdates": boolean;
    "request.credentials": string;
    "tracing.hideTracingResponse": boolean;
  };
  version: string;
};
export function delegateToSchema(options: any, ...args: any[]): any;
export function extendResolversFromInterfaces(schema: any, resolvers: any): any;
export function extractExtensionDefinitions(ast: any): any;
export function forEachField(schema: any, fn: any): void;
export function gql(...args: any[]): any;
export namespace gql {
  function disableExperimentalFragmentVariables(): void;
  function disableFragmentWarnings(): void;
  function enableExperimentalFragmentVariables(): void;
  function resetCaches(): void;
}
export function introspectSchema(fetcher: any, linkContext: any): any;
export function makeExecutableSchema(_a: any): any;
export function makeRemoteExecutableSchema(_a: any): any;
export function mergeSchemas(_a: any): any;
export function mockServer(schema: any, mocks: any, preserveResolvers: any): any;
export function toApolloError(error: any, code: any): any;
export function transformSchema(targetSchema: any, transforms: any): any;
