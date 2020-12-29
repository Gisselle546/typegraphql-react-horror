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
exports.ReviewResolver = void 0;
const Review_1 = require("./../entity/Review");
const type_graphql_1 = require("type-graphql");
const isAuth_1 = require("../utils/isAuth");
let reviewInput = class reviewInput {
};
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", Number)
], reviewInput.prototype, "rating", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], reviewInput.prototype, "description", void 0);
__decorate([
    type_graphql_1.Field(() => type_graphql_1.Int),
    __metadata("design:type", Number)
], reviewInput.prototype, "tourid", void 0);
reviewInput = __decorate([
    type_graphql_1.InputType()
], reviewInput);
let getUser = class getUser {
};
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], getUser.prototype, "id", void 0);
getUser = __decorate([
    type_graphql_1.InputType()
], getUser);
let ReviewResolver = class ReviewResolver {
    async reviews() {
        const review = await Review_1.Review.find({
            relations: ["user"],
        });
        return review;
    }
    async reviewByID(reviewId) {
        const review = await Review_1.Review.findOne(reviewId);
        if (review === undefined) {
            throw new Error;
        }
        return review;
    }
    async getReviewByUser(data) {
        let review = await Review_1.Review.find({
            relations: ['user'],
            where: {
                userId: parseInt(data.id)
            },
        });
        return review;
    }
    async getReviewByTour(tourId) {
        let review = await Review_1.Review.find({
            relations: ['user'],
            where: {
                tourId: tourId,
            }
        });
        return review;
    }
    async createReview(data, context) {
        const user = context.payload.userId;
        const review = Review_1.Review.create({
            ...data,
            userId: parseInt(user),
            tourId: data.tourid
        });
        await review.save();
        return review;
    }
};
__decorate([
    type_graphql_1.Query(() => [Review_1.Review]),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ReviewResolver.prototype, "reviews", null);
__decorate([
    type_graphql_1.Query(() => Review_1.Review, { nullable: true }),
    __param(0, type_graphql_1.Arg("reviewId")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], ReviewResolver.prototype, "reviewByID", null);
__decorate([
    type_graphql_1.Query(() => [Review_1.Review]),
    __param(0, type_graphql_1.Arg('data')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [getUser]),
    __metadata("design:returntype", Promise)
], ReviewResolver.prototype, "getReviewByUser", null);
__decorate([
    type_graphql_1.Query(() => [Review_1.Review]),
    __param(0, type_graphql_1.Arg('tourId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], ReviewResolver.prototype, "getReviewByTour", null);
__decorate([
    type_graphql_1.Mutation(() => Review_1.Review),
    type_graphql_1.UseMiddleware(isAuth_1.isAuth),
    __param(0, type_graphql_1.Arg("data")),
    __param(1, type_graphql_1.Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [reviewInput, Object]),
    __metadata("design:returntype", Promise)
], ReviewResolver.prototype, "createReview", null);
ReviewResolver = __decorate([
    type_graphql_1.Resolver()
], ReviewResolver);
exports.ReviewResolver = ReviewResolver;
