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
const accounts_1 = require("./accounts");
const common_1 = require("./common");
const orgs_1 = require("./orgs");
const USERNAME_MIN_LENGTH = 3;
const USERNAME_MAX_LENGTH = 24;
exports.memberId = common_1.objectId;
exports.username = Yup.string()
    .min(USERNAME_MIN_LENGTH)
    .max(USERNAME_MAX_LENGTH)
    .matches(/^[a-z]+([\.]?[a-z0-9])*$/);
exports.membership = Yup.string().oneOf(['active', 'deactivated', 'pending']);
exports.createMemberParams = Yup.object().shape({
    orgId: orgs_1.orgId.required(),
    accountId: accounts_1.accountId.required(),
    membership: exports.membership.notRequired(),
    username: exports.username.notRequired(),
});
exports.updateMemberRolesParams = Yup.object().shape({
    memberId: exports.memberId.required(),
    roles: Yup.array(Yup.string())
        .min(1)
        .required(),
});
//# sourceMappingURL=members.js.map