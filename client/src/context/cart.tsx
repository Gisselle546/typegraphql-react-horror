import React, { createContext,useReducer, useEffect, useContext } from "react";
import {Itour} from '../types/tour'

enum ActionType {
    ADDCART = "ADDCART",
    INCREMENT='INCREMENT',
    DECREMENT='DECREMENT'
  }

  const initialState={
    cart: JSON.parse(localStorage.getItem("token")!) || [],
    
}

interface Action {
    type: ActionType;
    payload?: {
        tourByID:Itour
    };
}


interface State{
    cart:Itour[]
}


const reducer: React.Reducer<State, Action> =  (state: State, action: Action) => {

    let updatedCart;
    let index;

    switch(action.type){
        case ActionType.ADDCART:
           
            updatedCart = [...state.cart];
            
            index=[...state.cart].findIndex((item:Itour)=>item.id === action.payload!.tourByID.id)
            
            if(index<0){
                updatedCart.push({...action.payload!.tourByID,quantity:1, total:action.payload!.tourByID.price})
            }else{

                updatedCart = [...state.cart];


                const updatedItem={
                    ...updatedCart[index]
                }
            updatedItem.quantity++;
            updatedItem.total=(updatedItem.price*updatedItem.quantity)
            updatedCart[index]=updatedItem;
            
            }
            console.log(updatedCart)
            
            return{
                ...state,
                cart:updatedCart
            };



        case ActionType.INCREMENT:
            updatedCart = [...state.cart];
             index = updatedCart.findIndex(
               ( item:Itour )=> item.id === action.payload!.tourByID.id
            );
  
            const incrementedItem = {
                ...updatedCart[index]
            };
  
            incrementedItem.quantity++;
  
            updatedCart[index] = incrementedItem;
  
  
            return {...state, cart: updatedCart};
            


        case ActionType.DECREMENT:
            updatedCart = [...state.cart];
            index= updatedCart.findIndex(
                ( item:Itour ) => item.id === action.payload!.tourByID.id
            );

            const decrementedItem = {
                ...updatedCart[index]
            };

            decrementedItem.quantity--;

            updatedCart[index] = decrementedItem;

            return {...state, cart: updatedCart};


              default:
                throw new Error();
   

  
    }


}

const CartContext = createContext<{
    state:State
    addCart:(items:any)=>void
    increment:(items:any)=>void
    decrement:(items:any)=>void
}>({
    state:initialState,
    addCart:()=>{},
    increment:()=>{},
    decrement:()=>{}
   
});


export const CartProvider = (props: { children: React.ReactNode; } )=>{
    const [state, dispatch] = useReducer(reducer, initialState);

    useEffect(() => {
        localStorage.setItem(
          "cart",
          JSON.stringify(state.cart)
        );
        
      });

    const addCart = (items:any)=>{
        dispatch({
            type:ActionType.ADDCART,
            payload:items!
        })
      }

      const increment = (items:any)=>{
        dispatch({
            type:ActionType.INCREMENT,
            payload:items!
        })
      }
    
      const decrement = (items:any)=>{
        dispatch({
            type:ActionType.DECREMENT,
            payload:items!
        })
      }
    
      
    
      return(
        <CartContext.Provider value={{state,addCart,increment,decrement}}>
            {props.children}
        </CartContext.Provider>
        );




};


export const useStore = () => useContext(CartContext);