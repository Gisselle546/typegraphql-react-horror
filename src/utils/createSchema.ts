import { OrderResolver } from './../resolvers/OrderResolver';
import { ReviewResolver } from './../resolvers/ReviewResolver';
import { TourResolver } from './../resolvers/TourResolver';
import { UserResolver } from '../resolvers/UserResolver';
import { buildSchema } from "type-graphql";

export const createSchema = () =>
  buildSchema({
    resolvers: [
      UserResolver,
      TourResolver,
      ReviewResolver,
      OrderResolver
    ]
  });