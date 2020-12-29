"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAuth = void 0;
const jsonwebtoken_1 = require("jsonwebtoken");
const apollo_server_express_1 = require("apollo-server-express");
exports.isAuth = ({ context }, next) => {
    const authorization = context.req.headers.authorization;
    if (!authorization) {
        throw new Error("not authenticated");
    }
    try {
        const token = authorization.split(" ")[1];
        const payload = jsonwebtoken_1.verify(token, process.env.JWT_SECRET);
        context.payload = payload;
    }
    catch (err) {
        console.log(err);
        throw new apollo_server_express_1.AuthenticationError('Totally expired');
    }
    return next();
};
