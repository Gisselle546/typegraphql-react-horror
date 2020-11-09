import React, { createContext,useReducer, useEffect, useContext } from "react";



enum ActionType {
    SIGNIN = "SIGNIN",
    SIGNOUT = "SIGNOUT"
  }

const initialState={
    token: JSON.parse(sessionStorage.getItem("token")!) || "",
    
}

interface Action {
    type: ActionType;
    payload?: {
        token:string
    };
}

interface State{
    token:string
}



const reducer: React.Reducer<State, Action> =  (state: State, action: Action) => {

    switch(action.type){
        case ActionType.SIGNIN:
            console.log(action.payload)
            return{
                token:action.payload!.token!
            };
            case "SIGNOUT":
              sessionStorage.clear();
              return{
                token:""
              };

              default:
                throw new Error();
   
  }

}

const AuthContext = createContext<{
    state:State
    addToken:(token:any)=>void
    
}>({
    state:initialState,
    addToken:()=>{}
   
});


export const AuthProvider = (props: { children: React.ReactNode; } )=>{
    const [state, dispatch] = useReducer(reducer, initialState);


    useEffect(() => {
        sessionStorage.setItem(
          "token",
          JSON.stringify(state.token)
        );
        
      },[state.token]);


      const addToken = (token:any)=>{
        dispatch({
            type:ActionType.SIGNIN,
            payload:token!
        })
      }

    return(
        <AuthContext.Provider value={{state,addToken}}>
            {props.children}
        </AuthContext.Provider>
        );



};

export const useStore = () => useContext(AuthContext);



