import React, {useState} from "react";
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';



interface Props{
    clicked:()=>void;
    setter:(value:number)=>void
    seedate:any
}


const DatePicker:React.FC<Props>=(props)=>{
    const [value, setValue] = useState(new Date());



    const dateHandler=(nextValue:any)=>{
        setValue(nextValue)
        props.setter(nextValue);
        props.clicked();
    }
    
    return (
      <div>
        <Calendar 
          calendarType="US"
          minDate={new Date(new Date().setDate(new Date().getDate() + 1))}
          onChange={dateHandler}
          value={value}
        />
      </div>
    );
  }

  export default DatePicker;