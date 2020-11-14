import React from 'react';

interface Routing {
    match:any,
    history:any,
   
  }

const CreateReview:React.FC<Routing>=({match,history})=>{

    return(
        <div>
        <h1>hiii</h1>
        </div>
    )
}

export default CreateReview;