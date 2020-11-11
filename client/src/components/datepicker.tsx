import React, { useContext } from "react";
import Calendar from 'react-calendar';
import { DateContext } from "../context/date";
import 'react-calendar/dist/Calendar.css';

function DatePicker() {
    const{date,setDate} = useContext(DateContext);
  
    return (
      <div>
        <Calendar
          onChange={setDate}
          value={date}
        />
      </div>
    );
  }

  export default DatePicker;