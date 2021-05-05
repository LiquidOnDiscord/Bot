"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_fetch_1 = __importDefault(require("node-fetch"));
function default_1(url) {
    return node_fetch_1.default(url).then(res => {
        if (!res.ok) {
            throw new Error(res.statusText);
        }
        return res.json();
    }).catch((err) => {
        throw new Error(err.message);
    });
}
exports.default = default_1;
//# sourceMappingURL=Request.js.map