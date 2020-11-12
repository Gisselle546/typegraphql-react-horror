import React,{useContext, useState} from 'react';
import { Button } from '@material-ui/core';
import { createStyles, makeStyles, Theme} from '@material-ui/core/styles';
import {DateContext} from '../context/date';
import {
    CardElement,
    useStripe,
    useElements
  } from "@stripe/react-stripe-js";
import {useCreateOrderMutation} from '../generated/graphql';

  const useStyles = makeStyles((theme: Theme) =>
  createStyles({

    card:{
        
        color: "#32325d",
        fontFamily: 'Arial, sans-serif',
        fontSmoothing: "antialiased",
        fontSize: "16px",
        width:"20%",
        marginLeft:"2rem",
        "::placeholder": {
          color: "#32325d"
        }
      },
      button:{
        width:"20%",
        backgroundColor:"#a72837",
        marginLeft:"2rem"
      }
    
  }),
);

interface Props{
   sum:string,
   quantity:any;
   clicked:()=>void
    
}



const StripeButton:React.FC<Props>=(props)=>{
    const stripe = useStripe();
    const elements = useElements();
    const classes = useStyles()
    const [createOrder] = useCreateOrderMutation();
    const {date} = useContext(DateContext);


    function clickHandler(){
      props.clicked();
      localStorage.clear();
    }


    console.log(props)

    const handleSubmit = async(event:any) => {
        event.preventDefault();
        
        const {error,paymentMethod} = await stripe!.createPaymentMethod({
          type:"card",
          card: elements!.getElement(CardElement)!, 
      
         
        });
        let response;
        
        try{
            response = await createOrder({
               variables:{
                  quantity:props.quantity,
                  stripeId:paymentMethod!.id,
                  total:parseFloat(props.sum),
                  reservation:date.toLocaleDateString()
               } 
            })
        }
        catch(error){
         console.log(error)
        }
      console.log(response)

    }

    

return (
    <div style={{marginTop:"10px"}}>
    
    <form onSubmit={handleSubmit}>
    <CardElement className={classes.card}/>
    <Button onClick={clickHandler} className={classes.button} variant="contained" color="secondary" type="submit">
      Pay
   </Button>
  </form>
  </div>
  )
}

export default StripeButton;
