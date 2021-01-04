import React,{lazy, Suspense, useContext, useState} from 'react';
import { createStyles, makeStyles, Theme} from '@material-ui/core/styles';
import {useStore} from '../context/cart';
import {DateContext} from '../context/date';
import { Grid, Typography,Button } from '@material-ui/core';


const Pay= lazy(()=>import('./pay'));


const useStyles = makeStyles((theme: Theme) =>
  createStyles({

 root:{
    paddingTop:"6rem",
    backgroundColor:"#ceccce",
    height:"100vh",
 },
 title:{
    padding:"1.5rem",

    marginLeft:"1.0rem",
    marginBottom:"1rem",
    fontFamily: 'Kaushan Script',
    color:"red"
 },
 cartItems:{
     borderTop:"2px solid #f6ffff",
     margin:"2rem"
 },
 imagePlaceholder:{
     height:"59%",
     width:"59%",
    marginLeft:"2rem",
    marginTop:"1rem"

 },
 paragraph:{
     fontSize:"1.6rem",
     letterSpacing:"2px"
 },
 deleteButton:{
    backgroundColor:"red",
    color:"#f6ffff"
 },
    price:{
        marginTop:"11.5rem",
        marginLeft:"1rem"
    },

    total:{
        display:"flex",
        justifyContent:"flex-end",
        marginTop:"9rem",
        marginRight:"1rem"
    },

    subtotal:{
        display:"flex",
        justifyContent:"flex-end",
       
    },
    empty:{
        padding:"1rem",
        fontSize:"1.4rem"
    },
    button:{
        marginLeft:"4.3rem",
        backgroundColor:"red",
        color:"#fff",
        padding:"0.8rem",
        width:"10%",
        "&:hover":{
            backgroundColor:"red",
            
        }
    }
    
  }),
);






const Cart:React.FC=()=>{
    const classes = useStyles();
    const {date} = useContext(DateContext);
    const {state,remove} = useStore();
    
    const[pay,goPay]=useState(false)
    let total;
    let quantity;
   
    state.cart.forEach((letter:any) => {
       
        quantity=letter.quantity
       
    });

    total=state.cart.reduce((acc,stars:any,index,array)=>acc+stars.total,0)



    function tax(total:any){
        const fee=total*0.07
        return fee.toFixed(2)
   }


   function completeTotal(total:any):number{
    return parseFloat(tax(total.toFixed(2)))+parseFloat(total.toFixed(2));
   }

   
   function payHandler(){
       goPay(!pay);
   }
   

    const renderHost=()=>{
        return state.cart.map((item:any)=>{
           
           return(
               <Grid container spacing={2}>
                   <Grid item xs={6} md={4}>
               
                    <Typography style={{marginTop:"2.4rem", marginLeft:"3rem"}}component="h5" variant="h5">{item.name}</Typography>
                    <img className={classes.imagePlaceholder} src={item.image[0]}/>
                   </Grid>

                   <Grid item xs={6} md={4}>
                    <div className={classes.price}>
                        <p className={classes.paragraph}>${item.price}<span style={{fontSize:"15px", color:"red"}}>x</span>{item.quantity}</p>
                        <Button variant="contained" size="large" onClick={()=>remove(item)}className={classes.deleteButton}>Delete</Button>

                    </div>
                  
                    
                   </Grid>
                   <Grid item xs={12} md={4}>
                        <div className={classes.total}>
                            <h1 style={{alignSelf:"flex-end"}}>${item.total}</h1>
                        </div>
                   </Grid>
               
             </Grid>
           );
          
           
        });
    

    }
   
   console.log(state.cart)
  

        return(
        <div className={classes.root}>
            <Typography className={classes.title } component="h2" variant="h3"> Cart </Typography>
            <div className={classes.cartItems} >
            {
                !state.cart.length? <div className={classes.empty}> No items in cart</div>:
                renderHost()
                
             }
            </div>
            <div style={{  borderBottom:"2px solid #f6ffff",margin:"2rem"}}></div>
            <div className={classes.subtotal}>
                <div style={{marginRight:"2rem"}}>
                 <Typography variant="h5">Subtotal: ${total}</Typography>
              
                <Typography variant="h5">Tax: ${tax(total)}</Typography>
                {(total)?
                <Typography variant="h5"><em>Total: ${completeTotal(total).toPrecision(4)}</em></Typography>:<Typography variant="h6"><em>Total: $0.00</em></Typography>
                 }
                   
                 </div>
              
               
            </div>
          
            {!pay &&<Button variant="contained" size="large" className={classes.button} onClick={()=>payHandler()}>Pay</Button>}
                 {
                   pay &&
                   <Suspense fallback={<div>Loading...</div>}>
                     <Pay clicked={()=>goPay(!pay)} sum={completeTotal(total).toFixed(2)} quantity={quantity}/>
                   </Suspense>
                 }
      
      
       </div>
        );


}

export default Cart;

