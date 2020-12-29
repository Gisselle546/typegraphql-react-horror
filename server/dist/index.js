"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require('dotenv').config();
require("reflect-metadata");
const jsonwebtoken_1 = require("jsonwebtoken");
const port = process.env.PORT || 2000;
const User_1 = require("./entity/User");
const token_1 = require("./utils/token");
const apollo_server_express_1 = require("apollo-server-express");
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const typeorm_1 = require("typeorm");
const createSchema_1 = require("./utils/createSchema");
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const main = async () => {
    const app = express_1.default();
    app.use(cors_1.default({ origin: "https://horrorapp.netlify.app/", credentials: true }));
    app.use(cookie_parser_1.default());
    await typeorm_1.createConnection({
        name: "default",
        type: "postgres",
        url: process.env.DATABASE_URL,
        synchronize: true,
        logging: true,
        entities: ["dist/entity/**/*.js"],
        extra: {
            ssl: process.env.SSL || false,
        },
    });
    const schema = await createSchema_1.createSchema();
    const apolloServer = new apollo_server_express_1.ApolloServer({
        schema,
        context: ({ req, res }) => ({
            req,
            res
        })
    });
    app.use(cookie_parser_1.default());
    app.post("/refresh", async (req, res) => {
        const token = req.cookies.dev;
        if (!token) {
            console.log("token is not valid " + token);
            return res.send({ ok: false, accessToken: "" });
        }
        let payload = null;
        try {
            payload = await jsonwebtoken_1.verify(token, process.env.REFRESH_SECRET);
        }
        catch (err) {
            console.log(err);
            return res.send({ ok: false, accessToken: "" });
        }
        console.log("payload :: " + payload.userId);
        //token is valid and we can send him access token now.abnf
        const user = await User_1.User.findOne({ id: payload.userId });
        if (!user) {
            console.log("User not found");
            return res.send({ ok: false, accessToken: "" });
        }
        //Referesh Token
        res.cookie("dev", token_1.refreshTokenGenerator(user), {
            httpOnly: true
        });
        return res.send({ ok: true, accessToken: token_1.accessTokenGenerator(user) });
    });
    apolloServer.applyMiddleware({ app, path: '/api', cors: false });
    app.listen(port, () => {
        console.log("App started");
    });
};
main();
