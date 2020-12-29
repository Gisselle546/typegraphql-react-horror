
import { TokenContext } from './../utils/context';

import { User } from './../entity/User';
import { Tour } from './../entity/Tour';
import { Review } from './../entity/Review';
import { Resolver, Query, InputType,Field, Mutation,Arg, Authorized, Int, Ctx, UseMiddleware} from "type-graphql";
import { isAuth } from '../utils/isAuth';
import { LessThanOrEqual } from 'typeorm';


@InputType()
class reviewInput{
    
    @Field()
    rating!:number;

    @Field()
    description!:string;

    
    @Field(()=>Int)
    tourid?:number;

  

  
}


@InputType()
  class getUser{
    @Field()
    id?:string
  }



@Resolver()
export class ReviewResolver{

  @Query(()=>[Review])
  
  async reviews(
    
  ){
    const review = await Review.find({ 
      relations: ["user"],
    },

    
    )
     return review;

  }

  @Query (()=>Review, { nullable: true })
   async reviewByID(
  @Arg("reviewId") reviewId: number,
  ): Promise<Review> {
    const review= await Review.findOne(reviewId);
    if (review === undefined) {
      throw new Error;
    }

    

    return review;
   
  }



@Query(()=>[Review])
async getReviewByUser(@Arg('data') data:getUser){
 
 let review = await Review.find({
   
   relations:['user'],
   where:{
    userId:parseInt(data.id!)
   },
 });
 
 return review;

}

@Query(()=>[Review])
async getReviewByTour(
  @Arg('tourId') tourId:number,
  
  ){

let review = await Review.find({
  
  relations:['user'],
  where:{
    tourId:tourId,
    
  }

});

return review;

}




@Mutation(()=>Review)
@UseMiddleware(isAuth)
async createReview(
  @Arg("data") data:reviewInput,
  @Ctx() context:TokenContext
):Promise<Review>{

  const user =context.payload!.userId;
 const review= Review.create({
   
   ...data,
   userId:parseInt(user),
   tourId:data.tourid
 })

await review.save(); 


return review;

}





}