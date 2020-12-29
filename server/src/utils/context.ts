import {Request,Response} from 'express';


export interface TokenContext{
    req:Request;
    res:Response;
    payload?: { userId: string };
}