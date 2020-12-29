"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderResolver = void 0;
const isAuth_1 = require("./../utils/isAuth");
const order_1 = require("./../entity/order");
const type_graphql_1 = require("type-graphql");
const stripe_1 = require("../stripe");
let OrderInput = class OrderInput {
};
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", Number)
], OrderInput.prototype, "quantity", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], OrderInput.prototype, "reservation", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", Number)
], OrderInput.prototype, "total", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], OrderInput.prototype, "stripeId", void 0);
OrderInput = __decorate([
    type_graphql_1.InputType()
], OrderInput);
let OrderResolver = class OrderResolver {
    async orders() {
        const order = await order_1.Order.find({ relations: ["tour"] });
        return order;
    }
    async createOrder(data, context) {
        const user = context.payload.userId;
        const order = order_1.Order.create({
            ...data,
            quantity: data.quantity,
            total: data.total,
            reservation: data.reservation,
            userId: parseInt(user)
        });
        let amount = (order.total * 100);
        const payment = await stripe_1.stripe.paymentIntents.create({
            amount: amount,
            currency: "usd",
            payment_method: data.stripeId,
            confirm: true
        });
        await order.save();
        return order;
    }
};
__decorate([
    type_graphql_1.Query(() => [order_1.Order]),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], OrderResolver.prototype, "orders", null);
__decorate([
    type_graphql_1.Mutation(() => order_1.Order),
    type_graphql_1.UseMiddleware(isAuth_1.isAuth),
    __param(0, type_graphql_1.Arg("data")),
    __param(1, type_graphql_1.Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [OrderInput, Object]),
    __metadata("design:returntype", Promise)
], OrderResolver.prototype, "createOrder", null);
OrderResolver = __decorate([
    type_graphql_1.Resolver()
], OrderResolver);
exports.OrderResolver = OrderResolver;
