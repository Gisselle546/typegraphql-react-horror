import React, { createContext,useState } from "react";



export const DateContext = createContext<{
    date:any,
    setDate:any;
   
}>({
    date:"",
    setDate:()=>{},
   
});


export const DateProvider = (props: { children: React.ReactNode; }) => {
  const [date, setDate] = useState(new Date());

  return (
    <DateContext.Provider value={{date, setDate}}>
      {props.children}
    </DateContext.Provider>
  );
};