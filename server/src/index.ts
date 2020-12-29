import { getToken } from './utils/getToken';
require('dotenv').config();
import "reflect-metadata";

import { verify } from 'jsonwebtoken';
const port = process.env.PORT || 2000;
import { User } from './entity/User';
import { accessTokenGenerator, refreshTokenGenerator } from './utils/token';



import { ApolloServer } from "apollo-server-express";
import cors from "cors";
import Express from "express";
import { createConnection } from "typeorm";
import {createSchema} from './utils/createSchema';
import cookieParser from "cookie-parser";


const main = async () => {

  const app = Express();
  app.use( cors({origin:"https://horrorapp.netlify.app",credentials:true}) );
  app.use(cookieParser());


   await createConnection({
    
    name: "default",
    type: "postgres",
    url: process.env.DATABASE_URL,
    synchronize: true,
    logging: true,
    entities: ["dist/entity/**/*.js"],
    extra: {
      ssl: process.env.SSL || false,
    },
    
    });
  
    const schema = await createSchema();
  
    const apolloServer = new ApolloServer({
      schema,
      context: ({ req,res }) => ({ 
       req,
       res
       
      })
    });
  
    

    app.use(cookieParser());
    

    
    app.post("/refresh", async (req, res) => {
      const token = req.cookies.dev;
      if (!token) {
        console.log("token is not valid " + token);
        return res.send({ ok: false, accessToken: "" });
      }
  
      let payload: any = null;
      try {
        payload = await verify(token, process.env.REFRESH_SECRET!);
      } catch (err) {
        console.log(err);
        return res.send({ ok: false, accessToken: "" });
      }
      console.log("payload :: " + payload.userId);
      //token is valid and we can send him access token now.abnf
      const user = await User.findOne({ id: payload.userId });
  
      if (!user) {
        console.log("User not found");
        return res.send({ ok: false, accessToken: "" });
      }
  
  
      //Referesh Token
      res.cookie("dev", refreshTokenGenerator(user), {
        httpOnly: true
      });
  
      return res.send({ ok: true, accessToken: accessTokenGenerator(user) });
    });
  


    apolloServer.applyMiddleware({ app, path:'/api',cors:false});
  
    app.listen(port, () => {
      console.log("App started");
      
    });
  };
  
  main();
  