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
exports.TourResolver = void 0;
const Tour_1 = require("./../entity/Tour");
const type_graphql_1 = require("type-graphql");
let CreateInput = class CreateInput {
};
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], CreateInput.prototype, "name", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], CreateInput.prototype, "images", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], CreateInput.prototype, "location", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], CreateInput.prototype, "description", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", Number)
], CreateInput.prototype, "price", void 0);
CreateInput = __decorate([
    type_graphql_1.InputType()
], CreateInput);
let TourResolver = class TourResolver {
    async tours(data) {
        const tours = await Tour_1.Tour.find({
            relations: ['reviews'],
            order: {
                price: (data == 'ASC') ? "ASC" : 'DESC'
            }
        });
        return tours;
    }
    async createTours(data) {
        const tour = Tour_1.Tour.create(data);
        await tour.save();
        return tour;
    }
    async tourByID(tourId) {
        const tour = await Tour_1.Tour.findOne(tourId, {
            relations: ['reviews', 'reviews.user'],
        });
        if (tour === undefined) {
            throw new Error;
        }
        return tour;
    }
};
__decorate([
    type_graphql_1.Query(() => [Tour_1.Tour]),
    __param(0, type_graphql_1.Arg("data")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], TourResolver.prototype, "tours", null);
__decorate([
    type_graphql_1.Mutation(() => Tour_1.Tour),
    __param(0, type_graphql_1.Arg("data")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [CreateInput]),
    __metadata("design:returntype", Promise)
], TourResolver.prototype, "createTours", null);
__decorate([
    type_graphql_1.Query(() => Tour_1.Tour, { nullable: true }),
    __param(0, type_graphql_1.Arg("tourId")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], TourResolver.prototype, "tourByID", null);
TourResolver = __decorate([
    type_graphql_1.Resolver()
], TourResolver);
exports.TourResolver = TourResolver;
