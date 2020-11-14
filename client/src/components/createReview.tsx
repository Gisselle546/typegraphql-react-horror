import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Rating from '@material-ui/lab/Rating';
import {Button, TextareaAutosize,Grid} from '@material-ui/core'
import {useCreateReviewMutation} from '../generated/graphql';

interface Routing {
    match:any,
    history:any,
   
  }

  const useStyles = makeStyles((theme: Theme) =>
  createStyles({
   
    root:{
      display:"flex",
      flexDirection:"column",
      alignItems:"flex-start",
      marginTop:"8rem",
      justifyContent:"center"
    },

    review:{
    
        display:"flex",
        flexDirection:"column",
        flex:" 1 1 300px",
        alignSelf:"center",
        padding:"10rem",
        justifyContent:"space-around",
        boxShadow: "rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px",
        backgroundColor:"rgb(247, 247, 247)",
        
    },

    button:{
        backgroundColor:"#69022f",
        color:"#fff",
        '&:hover': {
          backgroundColor:"#69022f",
        }
    }
    
  
 
}));

const CreateReview:React.FC<Routing>=({match,history})=>{
    const classes = useStyles();
    const [value, setValue] = React.useState<number | null>(1);
    const[createReview] = useCreateReviewMutation();

console.log(match.params.id)



    return(
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <div className={classes.root}>
                <div className={classes.review}>
                    
                    <Rating
                    name="simple-controlled"
                    value={value}
                    onChange={(event, newValue) => {
                        setValue(newValue);
                    }}
                    />
                
                    <TextareaAutosize style={{width:"100%"}}aria-label="minimum height" rowsMin={7} /> 
                    
                    <Button className={classes.button} variant="contained" size= "medium">Create Review</Button>
                
                </div>
        
        
            </div>
         </Grid>
     </Grid>
     
        
    )
}

export default CreateReview;