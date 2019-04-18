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
exports.PASSWORD_MIN_LENGTH = 6;
exports.PASSWORD_MAX_LENGTH = 128;
exports.accountId = common_1.objectId;
exports.accountEmail = common_1.email.email();
exports.accountPassword = Yup.string()
    .min(exports.PASSWORD_MIN_LENGTH)
    .max(exports.PASSWORD_MAX_LENGTH);
exports.createAccountParams = Yup.object().shape({
    email: exports.accountEmail.required(),
    password: exports.accountPassword.required(),
});
exports.signInParams = Yup.object().shape({
    email: exports.accountEmail.required(),
    password: exports.accountPassword.required(),
});
exports.findAccountByIdParams = Yup.object().shape({
    id: common_1.objectId.required(),
});
//# sourceMappingURL=accounts.js.map