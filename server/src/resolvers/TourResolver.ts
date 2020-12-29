import { ReviewResolver } from './ReviewResolver';
import { maxLength } from 'class-validator';
import {getRepository} from "typeorm"; 
import { TokenContext } from './../utils/context';
import { getToken } from './../utils/getToken';
import { Tour} from './../entity/Tour';
import { Resolver, Query, InputType,Field, Mutation,Arg, UseMiddleware } from "type-graphql";
import { Review } from '../entity/Review';
import {MoreThan, MoreThanOrEqual} from "typeorm";
import {User} from '../entity/User';
@InputType()
class CreateInput{
    
    @Field()
    name!:string;

    @Field()
    images?:string;

    @Field()
    location!:string

    @Field()
    description!:string;

    @Field()
    price!:number
}
 






@Resolver()
export class TourResolver {
  
  @Query(() => [Tour])
  async tours(
  @Arg("data") data:string,
  
  ) {
    
    
    const tours = await Tour.find({
     
      relations:['reviews'],
      
      order:
      {
        price: (data=='ASC')? "ASC":'DESC'
      }
    })


    return tours;
  }



@Mutation (()=>Tour)
async createTours(
    @Arg("data") data: CreateInput,
):Promise<Tour>{
    const tour = Tour.create(data);
      
    await tour.save()


    return tour;
}

@Query (()=>Tour, { nullable: true })
async tourByID(
  @Arg("tourId") tourId: number,
  ): Promise<Tour> {
    const tour= await Tour.findOne(tourId,{
      relations:['reviews','reviews.user'],
      
    
    
    });
    if (tour === undefined) {
      throw new Error;
    }

    

    return tour;
   
  }

}

