"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createSchema = void 0;
const OrderResolver_1 = require("./../resolvers/OrderResolver");
const ReviewResolver_1 = require("./../resolvers/ReviewResolver");
const TourResolver_1 = require("./../resolvers/TourResolver");
const UserResolver_1 = require("../resolvers/UserResolver");
const type_graphql_1 = require("type-graphql");
exports.createSchema = () => type_graphql_1.buildSchema({
    resolvers: [
        UserResolver_1.UserResolver,
        TourResolver_1.TourResolver,
        ReviewResolver_1.ReviewResolver,
        OrderResolver_1.OrderResolver
    ]
});
