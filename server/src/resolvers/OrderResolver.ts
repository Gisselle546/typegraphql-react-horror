import { isAuth } from './../utils/isAuth';
import { Order } from './../entity/order';
import { Resolver, Query, InputType, Field, Int, Mutation, UseMiddleware, Arg, Ctx} from "type-graphql";
import { TokenContext } from '../utils/context';
import { stripe } from '../stripe';



@InputType()
class OrderInput{

    @Field()
    quantity!:number;

    @Field()
    reservation!:string;

    @Field()
    total!:number;

    @Field()
    stripeId!:string
}





@Resolver()
export class OrderResolver{

    @Query(()=>[Order])
    async orders(){
        const order = await Order.find({ relations: ["tour"] });
        return order;
    }

 

  @Mutation(()=>Order)
  @UseMiddleware(isAuth)
  async createOrder(
      @Arg("data") data:OrderInput,
      @Ctx() context:TokenContext
      
    ){
      const user =context.payload!.userId;

      const order = Order.create({
        ...data,
        quantity:data.quantity,
        total:data.total,
        reservation:data.reservation,
        userId:parseInt(user)
      });


      let amount =(order.total!*100)!

      const payment = await stripe.paymentIntents.create({
        amount:amount,
        currency: "usd",
        payment_method:data.stripeId,
        confirm:true
      });
      
      await order.save();
      
     
      return order;
  
  
    }


}