import { User } from './../entity/User';
import { Field, ObjectType } from "type-graphql";

@ObjectType()
export class getToken {
  @Field()
  accessToken!: string;

  @Field(() => User)
  user!: User;
}