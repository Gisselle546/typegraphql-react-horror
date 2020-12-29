import { sign } from 'jsonwebtoken';
import { User } from './../entity/User';


export const accessTokenGenerator=(user:User)=>{
    return sign({ userId: user.id }, process.env.JWT_SECRET!,{
        expiresIn:process.env.JWTEXP!
    })
}


export const refreshTokenGenerator=(user:User)=>{
    return sign({ userId: user.id }, process.env.REFRESH_SECRET!,{
        expiresIn:process.env.JWTEXPREFREDJ!
    })
}