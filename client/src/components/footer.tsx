import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import { Link } from 'react-router-dom';



const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
        backgroundColor:"#69022f",
        padding:"1rem"
    },
    section:{
        display:"flex",
        justifyContent:"space-between"
    },

    tours:{
        color:"#fff",
        
    },

    link:{
        display:"flex",
       
    }




  })
);


const Footer:React.FC=()=>{

    const classes = useStyles();



return(
    <div className={classes.root}>
        <div className={classes.section}>
        <Typography className={classes.tours}>Horror Tours</Typography>
        <div className={classes.link}>
            <Link to={{ pathname: '/signup'}}><Typography className={classes.tours}>Sign Up</Typography></Link>
            <Link to={{ pathname: '/signin'}}><Typography style={{marginLeft:"30px"}}className={classes.tours}>Sign In</Typography></Link>
            
        </div>
       
        </div>
        <hr/>
        <Typography style={{display:"flex",justifyContent:"flex-end", color:"#fff"}}>Copyright &copy;2020</Typography>

    </div>

)

}

export default Footer;