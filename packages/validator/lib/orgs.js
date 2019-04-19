"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const Yup = __importStar(require("yup"));
const common_1 = require("./common");
const ORG_NAME_MIN_LENGTH = 3;
const ORG_NAME_MAX_LENGTH = 24;
const ORG_NAMESPACE_MIN_LENGTH = 3;
const ORG_NAMESPACE_MAX_LENGTH = 20;
exports.orgId = common_1.objectId;
exports.orgName = Yup.string()
    .min(ORG_NAME_MIN_LENGTH)
    .max(ORG_NAME_MAX_LENGTH)
    .trim()
    .matches(/^((?!(\s{2,})).)*$/, { message: 'org_name_is_invalid' });
exports.orgNamespace = Yup.string()
    .min(ORG_NAMESPACE_MIN_LENGTH)
    .max(ORG_NAMESPACE_MAX_LENGTH)
    .lowercase()
    .trim()
    .matches(/^([a-z0-9])+$/, { message: 'org_namespace_is_invalid' });
exports.createOrgParams = Yup.object().shape({
    name: exports.orgName.required(),
    namespace: exports.orgNamespace.required(),
});
exports.findOrgByIdOrNamespaceParams = Yup.object({
    namespace: exports.orgName,
    id: Yup.string().when('namespace', {
        is: (ns) => !ns,
        then: common_1.objectId.required(),
        otherwise: common_1.objectId,
    }),
});
//# sourceMappingURL=orgs.js.map