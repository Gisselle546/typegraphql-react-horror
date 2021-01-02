import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { Button, Typography,Grid} from '@material-ui/core';


const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      height:"74vh",
      background:"linear-gradient(to right,rgba(0,0,0, 0),rgba(0,0,0, 100)),url(https://images.unsplash.com/photo-1431440869543-efaf3388c585?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1920&q=80) center/cover",
      display:"flex",
      alignItems:"center",
      justifyContent:"center"
    },
 
    homepageButton:{
       color:"#000",
       marginLeft:"20rem",
       fontSize:"1.2rem",
       backgroundColor:"#fff",
       padding:"1rem",
       "&:hover":{
           backgroundColor:"#fff",
           border:"5px solid #fff",
       },
    },
    header:{
        color:"#000",
        display: "flex",
        justifyContent:"center",
        padding:"1rem",
        fontFamily:"Roboto",
        fontSize:"2.2rem"
    },

    section:{
        height:"52rem",
        background:"url(https://images.unsplash.com/photo-1562145287-6a1613c72949?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2550&q=80) left/cover",
        display:"flex"
    },
    subSection:{
        height:"48rem", 
        color:"blue", 
        backgroundColor:"#f6feff",
        padding:"1rem",
        boxShadow: "7px 7px 5px -4px rgba(0,0,0,0.59)",
        flex:"0 1 40%"
    },

    reading:{
        color:"#000",
        fontSize:"1.1rem",
        marginLeft:"8px",
        letterSpacing: "2px",
        fontFamily:"oxygen",
        fontWeight:"bold"
    },

    subButton:{
        backgroundColor:"#69022f",
        color:"#fff",
        padding:"0.5rem",
        

        "&:hover":{
            backgroundColor:"#69022f",
            border:"5px solid #69022f",
           
        }
    
    
    
    }

  }),
);


interface Props{
    history:any
}

const Homepage: React.FC<Props> = ({history}) => {
    const classes = useStyles();


    return(
        <>
        <Grid container spacing={3}>
        <Grid item xs={12}>
        <div className={classes.root}>
            <Button  variant="outlined" onClick={()=>history.push('/tours')}size="large"className={classes.homepageButton}>Check tours!</Button>
        </div>
        <Grid item xs={12}>
        <div className={classes.section}>
            <div className={classes.subSection}>
                <Typography className={classes.header}variant="h4">Step into your fears!</Typography>

                <p style={{marginTop:"5rem"}}className={classes.reading}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
                Mauris ultrices eros in cursus turpis. Cursus sit amet dictum sit amet justo. Donec massa sapien faucibus et. Auctor augue mauris augue neque gravida.
            
                </p>

                <p style={{marginTop:"10rem"}}className={classes.reading}>
                Netus et malesuada fames ac. Ultricies mi eget mauris pharetra. Vulputate dignissim suspendisse in est ante in nibh mauris cursus.
                 Magna etiam tempor orci eu. Sapien pellentesque habitant morbi tristique senectus. Velit aliquet sagittis id consectetur purus ut faucibus.
               </p>
                <Button onClick={()=>history.push('/signup')}className={classes.subButton}size="large">Sign Up</Button>
            </div>
        </div>
        </Grid>
        </Grid>
        </Grid>
       </>
    )

}

export default Homepage;