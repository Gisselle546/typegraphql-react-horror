import React from 'react';
import { Dialog,DialogActions,DialogContent,DialogTitle,Button } from '@material-ui/core';


interface Props{
   onCloseModal:()=>void,
   open:boolean,
   title:string,
   content:string

}






const CustomDialog:React.FC<Props>=(props)=>{
    

    

return(
    <Dialog open={props.open} >
          <DialogTitle>{props.title}</DialogTitle>
          <DialogContent > {props.content}</DialogContent>
          <DialogActions> <Button onClick={props.onCloseModal} color="primary">Close</Button></DialogActions>

    </Dialog>


    )


}

export default CustomDialog;