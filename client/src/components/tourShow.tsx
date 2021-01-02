import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { Button, CircularProgress,Grid, Typography } from '@material-ui/core';
import React,{lazy,Suspense, useContext, useState} from 'react';
import Rating from '@material-ui/lab/Rating';
import { useTourByIdQuery } from '../generated/graphql';
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import {useStore} from '../context/cart';
import {DateContext} from '../context/date';
const AddCartModule = lazy(()=>import('./addCartModule'))
const DatePicker = lazy(()=>import('./datepicker'))
const Included = lazy(()=>import('./included'))

interface Routing {
    match:any,
    history:any,
   
  }
  

  const useStyles = makeStyles((theme: Theme) =>
  createStyles({
   
    root:{
      height:"900px",
      marginTop:"6rem"
    },




    tourinfo:{
        display: 'flex',
        width:'200px',
        [theme.breakpoints.up('md')]: {
          width:'500px'
        }
       
    },

    title:{
      fontFamily:"Roboto",
      marginLeft:"30px",
      color:"#69022f"
    },

    detailTour:{
      display:"flex",
      flexDirection:"column",
      backgroundColor:"rgb(247, 247, 247)",
      boxShadow: "rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px",
      flex:"0 1 300px",
      height:"600px",
      justifyContent:"center",
      alignItems:"flex-start",
      
    },

    button:{
      alignSelf:"center",
      backgroundColor:"#69022f",
      color:"#fff",
      '&:hover': {
        backgroundColor:"#69022f",
      }
     
    },
    tourShowHeader:{
      color:"#69022f",
      fontFamily:"Roboto",
      margin:"10px 0 0 10px"
    },

    description:{
      fontSize:"1.2rem",
      fontFamily:"oxygen",
      marginLeft:"10px",
      flexWrap:"wrap"
    },

    includedbutton:{
      border: "none",
      fontSize:"1.6rem",
      color:"#000",
      '&:hover':{
        backgroundColor:"#fff"
      }
    },

    review:{
      display:"flex",
      marginTop:"50px",
      marginLeft:"30px"
    }
    
  
 
}));

const TourShow:React.FC<Routing>=({match,history})=>{
    const classes = useStyles();
    const {addCart}=useStore();
    const[cart,showcartModal]= useState(false);
    const {date,setDate} = useContext(DateContext);
    const[datecom,showdateModal] = useState(false);
    const [included,showIncluded]=useState(false);
    const { data, loading, error } = useTourByIdQuery({
        variables: {
              tourId: parseFloat(match.params.id)
         },
     });


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
    
const tourImages = data!.tourByID!.image.map((images:any)=>{
  
    return(  
      <div key="images">
            <img src={images} />
      </div>
    )
  
});

console.log(data!.tourByID!.reviews)

const totalReviews=data!.tourByID!.reviews.reduce((acc,stars:any,index,array)=>acc+stars.rating,0).toPrecision(2)

const review = data!.tourByID!.reviews.map((review:any)=>{
  return(
    <div key={review.id}>
    <div className={classes.review}>
      
        <h3>{review.user.name}</h3>
        <Rating style={{alignSelf:"center"}}name="read-only" value={review.rating} readOnly />
       
    </div>
    <p style={{marginLeft:"30px"}}>{review.description}</p>
   </div>
  )

})





      
const confirmhandler=()=>{
  addCart(data)!
  showcartModal(true);
 
}
     
   const renderLoader=()=><div>loader</div>;

    return(

      <div style={{marginTop:"6rem"}}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <div className={classes.tourinfo}>
                <Carousel width='500px' showArrows={false} showStatus={false} >
                  {tourImages}
                </Carousel>
                <div>
                    <Typography className={classes.title}component="h2" variant="h4" >{data!.tourByID!.name}</Typography>  
                    
                    <Typography style={{marginLeft:"30px",fontSize:"15px"}}variant="subtitle1" color="textSecondary">{data!.tourByID!.location}</Typography>
                    <Typography style={{marginTop:"30px",color:"#000", fontSize:"1.4rem"}}className={classes.title}component="h5" variant="h5" >${data!.tourByID!.price}</Typography>
                </div>
            </div> 
            
          </Grid>
          <Grid item xs={12} md={3}>
          <div className={classes.detailTour}>
          
          
          {!datecom && <Button onClick={()=>showdateModal(true)}className={classes.button} variant="contained" size= "medium">Pick A Date</Button>}

          {
            datecom&&
            <Suspense fallback={renderLoader()}>
              <DatePicker setter={setDate} seedate={date} clicked={()=>showdateModal(false)}/>
            </Suspense>
          }
          
         
         
         
         
          {!cart&&<Button className={classes.button} onClick={confirmhandler} style={{marginTop:"30px"}} variant="contained" size= "medium">Add Cart</Button>}
          
          {
            cart &&
            <Suspense fallback={renderLoader()}>
              <AddCartModule data={data} clicked={()=>showcartModal(false)}/>
            </Suspense>
          }

          <Button className={classes.button} onClick={()=>history.push(`${match.url}/createreview`) }style={{marginTop:"30px"}} variant="contained" size= "medium">Create a Review</Button>

          </div>

          </Grid>


        </Grid>
        <div className={classes.root}>
        <Grid container spacing={2}  >
          <Grid item xs={12} >
          <Typography className={classes.tourShowHeader}component="h2" variant="h2">Overview</Typography>
            <p className={classes.description}>{data!.tourByID!.description}</p>

          </Grid>
          <Grid item xs={12}>
            <div style={{display:"flex"}}>
            <Typography className={classes.tourShowHeader}component="h3" variant="h3">What's included</Typography>
            
           { !included&& <Button  onClick={()=>showIncluded(true)}className={classes.includedbutton}variant="outlined"  size= "small">+</Button>}
            
            {included&&
              <Suspense fallback={renderLoader()}>
              <Included clicked={()=>showIncluded(false)}/>
            </Suspense>
            
           }
            
            </div>
          </Grid>
      
    
      </Grid>
      <Grid container spacing={2} >
          <Grid item xs={12} >

         <div style={{marginTop:"90px"}}>
         <Typography className={classes.tourShowHeader}component="h3" variant="h3">Reviews</Typography>
        
          </div> 
          <div style={{display:"flex"}}>
          <Typography style={{margin:"1rem 0 0 1rem"}}component="h3" variant="h3" >{totalReviews}</Typography> 
          <p style={{alignSelf:"flex-end"}}> Avg</p>
          <Rating size="medium" style={{alignSelf:"center", margin:"0px,0px,50px,30px"}}name="read-only" value={parseFloat(totalReviews)} readOnly />
          </div>
            {review}
           </Grid>
      </Grid>

      </div>
      </div>
    )



}
export default TourShow;