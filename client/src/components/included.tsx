import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import CheckIcon from '@material-ui/icons/Check';
import CloseIcon from '@material-ui/icons/Close';
import { Button } from '@material-ui/core';



const useStyles = makeStyles((theme: Theme) =>
  createStyles({
   
    check:{
        color:"#10a85a"
    
    },

    close:{
        color:"#a8102c"
    },
    closeButton:{
        backgroundColor:"#69022f",
        color:"#fff",
        '&:hover': {
            backgroundColor:"#69022f",
          }
    }

}));

interface Props{
clicked:()=>void
}

const Included:React.FC<Props>=(props)=>{
    const classes = useStyles();


    return(
    <div style={{marginTop:"2rem"}}>

        <ul style={{listStyleType:"none"}}>
            <div>
            <li style={{display:"flex"}}><CheckIcon className={classes.check}/><h3 style={{fontSize:"1rem"}}>Guide</h3></li>
            <li style={{display:"flex"}}><CheckIcon className={classes.check}/><h3 style={{fontSize:"1rem"}}>Meals</h3></li>
            <li style={{display:"flex"}}><CloseIcon className={classes.close}/><h3 style={{fontSize:"1rem"}}>Souvenirs</h3></li>
            <li style={{display:"flex"}}><CloseIcon className={classes.close}/><h3 style={{fontSize:"1rem"}}>Insurance</h3></li>
            </div>
        </ul>
        <Button className={classes.closeButton} onClick={props.clicked}>close</Button>
    </div>
)

}

export default Included;