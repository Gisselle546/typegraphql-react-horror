import React from 'react';
import { withRouter, RouteComponentProps } from "react-router-dom";
import { Dialog,DialogActions,DialogContent,DialogTitle,Button } from '@material-ui/core';


interface Props{
   onCloseModal:()=>void,
   open:boolean,
   title:string,
   content:string,
   history:any
}






const CustomDialog:React.FC<Props & RouteComponentProps>=(props)=>{
    

    

return(
    <Dialog open={props.open} >
          <DialogTitle>{props.title}</DialogTitle>
          <DialogContent > {props.content}</DialogContent>
          <DialogActions> <Button onClick={props.onCloseModal} color="primary">Close</Button><Button onClick={()=>props.history.push(`/cart`) }>Go To Cart</Button></DialogActions>

    </Dialog>


    )


}

export default withRouter(CustomDialog);