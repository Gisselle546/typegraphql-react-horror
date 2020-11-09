import { CircularProgress } from '@material-ui/core';
import React from 'react';
import { useTourByIdQuery } from '../generated/graphql';




interface TodoItemProps {
    match:any,
    history:any,
   
  }
  

const TourShow:React.FC<TodoItemProps>=({match,history})=>{

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
    





console.log(data)

    return(
        <div>

        </div>
    )



}
export default TourShow;