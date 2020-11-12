import React from 'react';

import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import StripeButton from './stripeButton';

interface Props{
   
   sum:string
   quantity:any
   clicked:()=>void
}


const Pay:React.FC<Props>=(props)=>{

const promise = loadStripe(process.env.REACT_APP_STRIPE_SECRET!);



return(

<Elements stripe={promise}>
        <StripeButton clicked={()=>props.clicked()} sum={props.sum} quantity={props.quantity}/>
</Elements>
);

}

export default Pay;
