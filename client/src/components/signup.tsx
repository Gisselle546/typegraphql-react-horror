import React, { useState } from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { TextField, Button } from '@material-ui/core';
import {IfcSignupInterface} from '../types/signup';
import {useRegisterMutation} from '../generated/graphql';
import {useStore} from '../context/token';

const useStyles = makeStyles(theme=>({
   
    root:{
        display:"flex",
        justifyContent:"center",
        marginTop:"7rem",
       

    },


   form:{
    
    flexDirection:"column",
    justifyContent:"center",
    alignContent:"center",
    padding:"6rem",
    boxShadow:"10px 10px 5px #aaaaaa",
    backgroundColor:"#69022f"
   
   },

   field:{
    flex:"1 0 auto",
    color:"#fff",
    fontSize:"1rem",
    "&.focused": {
        color: "yellow"
      },
    
       
   },

   
   underline: {
    "&:before": {
      borderBottom: "1px solid #fff"
    },
  },
  
  button:{
      backgroundColor:"#fff",
      display:"flex",
      marginLeft:"65px"
  },
  
}));

const defaultData:IfcSignupInterface={
    name: " ",
    email:" ",
    password:" "

};




const SignUp:React.FC=()=>{
    const classes = useStyles();
    const[signup,setSignup] = useState(defaultData)
    const [register] = useRegisterMutation();
    const {addToken} = useStore()
  
    function handleChange (event:React.ChangeEvent<HTMLInputElement>) {
        const{name,value}=event.target;
        setSignup(prevsignup=>({
          ...prevsignup,
          [name]:value
        })); 
      }

      const handleSubmit = async(event:any) => {

        event.preventDefault();
        try{
            const token = await signupHandler();
            addToken(token);
        }catch(err){
            console.dir(err)
        }
      }



     async function signupHandler(){
         const{name,email,password}=signup;

         let response:any
         try{
             response= await register({
                 variables:{
                     name,
                     email,
                     password
                 }
             })
             
         }catch(err){
             console.log(err)
         }
        const {accessToken} = response!.data!.register
        return {token:accessToken}
        
     }



    return(
        <div className={classes.root}>
           
                <form onSubmit={handleSubmit} className={classes.form} autoComplete="off">
                    <div  style={{margin:"3rem"}}>
                        
                        <TextField  InputProps={{classes:{underline: classes.underline}}} onChange={handleChange} InputLabelProps={{ classes: {root: classes.field,focused: "focused",shrink: "shrink"} }} label="Name" name="name"  />
                    
                    </div>
                    <div style={{margin:"3rem"}}>
                    
                        <TextField  InputProps={{classes:{underline: classes.underline}}} onChange={handleChange} InputLabelProps={{ classes: { root: classes.field,focused: "focused", shrink: "shrink"}}} label="Email" name="email"  />
                    
                    </div>
                    <div style={{margin:"3rem"}}>
                    
                        <TextField  InputProps={{classes:{underline: classes.underline}}}  onChange={handleChange} InputLabelProps={{classes: {root: classes.field,focused: "focused",shrink: "shrink"}}} label="Password" type="password" name="password"  />
                    
                    </div>

                    <Button variant="contained" size= "large"  type="submit" className={classes.button}>Signup</Button>
                
                </form>
            
        </div>
    )

}

export default SignUp;