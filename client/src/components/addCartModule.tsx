import { Button, Typography } from '@material-ui/core';
import { createStyles, makeStyles, Theme} from '@material-ui/core/styles';
import React, {useState } from 'react';
import {useStore} from '../context/cart';
import CustomDialog from './dialog';





interface Props{
   
    data:any;
    clicked:()=>void;
    date:any;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({

  button:{
      width:"20px",
      height:"25px",
      padding:"0.5rem",
      marginTop:"0.4rem",
     
    },

    cart:{
        textAlign:"center",
        padding:"1rem"
    },
    quantity:{
       fontSize:"1.4rem",
       padding:"0.2rem"
    }
    
  }),
);

const AddCartModule:React.FC<Props>=(props)=>{
    const classes = useStyles();
    const[modal,showModal]= useState(false);
    
    let value;
   
    const {state} = useStore();
        console.log(props.data.tourByID.id)


        state.cart.filter((x:any) => x.id === props.data.tourByID.id).forEach((letter:any) => {
            value=letter.quantity;
           
        });

      

        const confirmhandler=()=>{
            console.log(modal)
            showModal(true);
            
           
        }

        const closeDialog=()=>{
            showModal(false);
            props.clicked();
        }
     
    return(
        <div className={classes.cart}>
            
            
            <Typography>Number of Adults</Typography>
                    
            <div style={{display:"flex", justifyContent:"center"}}>
            <Button className={classes.button} variant="contained" color="primary">-</Button>
            
            {<Typography className={classes.quantity}>{value}</Typography>}

            <Button className={classes.button} variant="contained" color="primary">+</Button>
            </div>
            <Button onClick={confirmhandler}>Confirm</Button>
           
            <CustomDialog title='Great Choice!!' open={modal} content="Added to cart!" onCloseModal={closeDialog}/>
          
      </div>
    )
}

export default AddCartModule;
