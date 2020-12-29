"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.refreshTokenGenerator = exports.accessTokenGenerator = void 0;
const jsonwebtoken_1 = require("jsonwebtoken");
exports.accessTokenGenerator = (user) => {
    return jsonwebtoken_1.sign({ userId: user.id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWTEXP
    });
};
exports.refreshTokenGenerator = (user) => {
    return jsonwebtoken_1.sign({ userId: user.id }, process.env.REFRESH_SECRET, {
        expiresIn: process.env.JWTEXPREFREDJ
    });
};
