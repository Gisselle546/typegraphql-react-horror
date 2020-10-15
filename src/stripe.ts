import Stripe from 'stripe'

export const stripe = new Stripe(process.env.STRIPESECRET!,{
    apiVersion: '2020-08-27',
  });