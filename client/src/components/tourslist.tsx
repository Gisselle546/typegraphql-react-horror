import React, { useState } from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { useToursQuery } from "../generated/graphql";

import { Button, Typography,Grid, Card, CardMedia, CardContent, CircularProgress} from '@material-ui/core';
import Rating from '@material-ui/lab/Rating';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
   
    root:{
        display: 'flex'
       
    },

    cover:{
        width:"190px",
        height:"190px"
    },

    content:{
        flex: '1 0 auto',
    },
    details:{
        display: 'flex',
      flexDirection: 'column',
    },

    outsideGrid:{
        marginTop:"5rem"
    },

    list:{
        marginTop:'1rem',
        boxShadow: "rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px"
    },
    button:{
        marginTop:"1rem",
        backgroundColor:"#69022f",
        color:"#fff",
        '&:hover': {
            backgroundColor:"#69022f",
          }
        
    }
 
}));

interface TodoItemProps {
    match:any
    history:any
  }
  



const TourList:React.FC<TodoItemProps>=({match,history})=>{
    const classes = useStyles();
    const [sort,setSort] = useState('ASC')
    const { data,loading,error,refetch } = useToursQuery({variables:{
        data:sort
    }});

    const MAX_LENGTH = 80;



 if (loading) {
    return(
      <div style={{
         display:"flex",
         flexDirection:"column",
         alignItems:"center",
         marginTop:"40px"
      }}
      >
         <CircularProgress/>
      </div>
   )
    }
    if (error) {
      return <div>Error</div>
      
    }

    console.log(match)

    const query=data!.tours.map(tour=>{
        const stars=tour.reviews.reduce((acc,stars:any,index,array)=>acc+stars.rating,0);
       
        return(
            <div className={classes.list} key={tour.id}>
                <Card className={classes.root}>
                    <CardMedia
                        className={classes.cover}
                        image={tour.image[0]}
                        title="Live from space album cover"
                    />
                     <div className={classes.details}>
                            <CardContent className={classes.content}>
                            <Typography component="h5" variant="h5">
                                {tour.name}
                            </Typography>
                            <div style={{display:"flex",justifyContent:"space-between"}}>
                            <Typography variant="subtitle1" color="textSecondary">
                               {tour.location}
                            </Typography>
                            <Typography component="h2" variant="h5" >${tour.price}</Typography>
                            </div>
                            <Rating name="half-rating-read" defaultValue={stars} precision={0.5} readOnly />
                            <div>
                            {
                                tour.description.length>MAX_LENGTH ?
                                (
                                   `${tour.description.substring(0,MAX_LENGTH)}...`
                                ):
                               <p>{tour.description}</p>
                            }
                            </div>
                            <div style={{display:"flex", justifyContent:"flex-end"}}>
                            <Button onClick={()=>history.push(`${match.url}/${tour.id}`)}variant="contained" size= "medium"  type="submit" className={classes.button}>See More</Button>
                            </div>
                            </CardContent>
                        
                     </div>
                </Card>

            </div>
        );
    })

     function handleRefetch( data:any){
        setSort(data);
        refetch()
    }

   

return(
  <div className={classes.outsideGrid}>
    <Grid container spacing={2}>
        <Grid item xs={12} md={3}>
            Filter By Price:
            <div style={{marginTop:"1rem"}}>
           <Button onClick={()=>handleRefetch('ASC')} size="small" variant="outlined">Low to High</Button>
           <Button onClick={()=>handleRefetch('DESC')} style={{marginLeft:"1rem"}}size="small" variant="outlined">High to Low</Button>
           </div>
        </Grid>
        <Grid item xs={12} md={6}>
            {query}
        </Grid>
    </Grid>
  </div>
)

}

export default TourList;