import { TokenContext } from './context';
import { verify } from "jsonwebtoken";
import { MiddlewareFn} from 'type-graphql';
import {AuthenticationError } from 'apollo-server-express';

export const isAuth: MiddlewareFn<TokenContext> = ({context},next)=>{
    const authorization = context.req.headers.authorization;

    

    if(!authorization){
        throw new Error("not authenticated")
    }
    try {
        const token = authorization.split(" ")[1];
        const payload = verify(token, process.env.JWT_SECRET!);
        
        context.payload = payload as any;
      } catch (err) {
        console.log(err);
        throw new AuthenticationError('Totally expired');
      }
    
      return next();
}