import React, {useState} from "react";
import Calendar from 'react-calendar';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import 'react-calendar/dist/Calendar.css';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
   
    root:{
     marginLeft:"30px"
    },




   
   
    
  
 
}));

interface Props{
    clicked:()=>void;
    setter:(value:number)=>void
    seedate:any
}


const DatePicker:React.FC<Props>=(props)=>{
    const [value, setValue] = useState(new Date());
    const classes = useStyles();


    const dateHandler=(nextValue:any)=>{
        setValue(nextValue)
        props.setter(nextValue);
        props.clicked();
    }
    
    return (
      <div style={{display:"flex"}}>
        <Calendar 
          className={classes.root}
          calendarType="US"
          minDate={new Date(new Date().setDate(new Date().getDate() + 1))}
          onChange={dateHandler}
          value={value}
        />
      </div>
    );
  }

  export default DatePicker;