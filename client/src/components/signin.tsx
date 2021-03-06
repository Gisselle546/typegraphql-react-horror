import React, { useState } from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import {IfcSigninInterface} from '../types/signin';
import { TextField, Button } from '@material-ui/core';
import {useLoginMutation} from '../generated/graphql';
import {useStore} from '../context/token';



const useStyles = makeStyles((theme: Theme) =>
  createStyles({
   
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

  helperText:{
    color:"yellow"
}

  
}));


const defaultData:IfcSigninInterface={
  
  email:" ",
  password:" "

};



interface Props{
  history:any
}

const SignIn:React.FC<Props>=({history})=>{
    const classes = useStyles();
    const [signin,setSignin]=useState(defaultData);
    const [login,{error}] = useLoginMutation();
    const {addToken} = useStore()


    function handleChange (event:React.ChangeEvent<HTMLInputElement>) {
      const{name,value}=event.target;
      setSignin(prevsignin=>({
        ...prevsignin,
        [name]:value
      })); 
    }

    const handleSubmit = async(event:any) => {

      event.preventDefault();
      try{
          const token = await signinHandler();
          addToken(token);
        history.push('/tours')
      }catch(err){
          console.dir(err);
          
      }
    }

    function handleError(field:any){
      return error&& field===""
    }

   async function signinHandler(){
       const{email,password}=signin;

       let response:any
       try{
           response= await login({
               variables:{
                  
                   email,
                   password
               }
           })
           
       }catch(err){
           console.dir(err)
       }
      const {accessToken} = response!.data!.login
      return {token:accessToken}
      
   }

   

    return(
      <div className={classes.root}>
           
      <form onSubmit={handleSubmit} className={classes.form} autoComplete="off">
          
          <div style={{margin:"3rem"}}>
          
              <TextField  InputProps={{classes:{underline: classes.underline}}} 
              onChange={handleChange} 
              InputLabelProps={{ classes: { root: classes.field,focused: "focused", shrink: "shrink"}}} label="Email" name="email"  
              helperText={error&&error.graphQLErrors[0].message} 
              error={handleError(signin.email)}
              FormHelperTextProps={{
                  className: classes.helperText
                }}
              />
              
          
          </div>
          <div style={{margin:"3rem"}}>
          
              <TextField  InputProps={{classes:{underline: classes.underline}}}  
              onChange={handleChange} 
              InputLabelProps={{classes: {root: classes.field,focused: "focused",shrink: "shrink"}}} label="Password" type="password" name="password"  
              helperText={error&&error.graphQLErrors[0].message} 
              error={handleError(signin.email)}
              FormHelperTextProps={{
                  className: classes.helperText
                }}
              />
              
             
          
          </div>

          <Button variant="contained" size= "large"  type="submit" className={classes.button}>Signin</Button>
      
      </form>
  
</div>
)
    



}

export default SignIn;