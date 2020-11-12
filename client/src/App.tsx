import React from 'react';
import {ApolloLink, ApolloClient, InMemoryCache,HttpLink,ApolloProvider } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { onError } from "@apollo/client/link/error";
import{BrowserRouter, Route,Switch,} from 'react-router-dom';
import './App.css';
import Drawer from './components/drawer'
import Homepage from './components/homepage'
import Footer from './components/footer';
import SignUp from './components/signup';
import TourList from './components/tourslist';
import {useStore} from './context/token';
import TourShow from './components/tourShow';
import Cart from './components/cart';


function App() {

  const httpLink = new HttpLink({
    uri: 'http://localhost:4000/api',
    credentials:'include'
  });
  
  const {state}=useStore();

  const token=state.token

  const authLink = setContext((_, { headers }) => {
    
   
  
         
       return {
         headers: {
           ...headers,
           authorization:  token ? `Bearer ${token}` : '',
         },
       };
     });


  
  const errorLink = onError(({ graphQLErrors, networkError }) => {
    if (graphQLErrors)
      graphQLErrors.map(({ message, locations, path }) =>
        console.log(
          `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
        )
      );
    if (networkError) console.log(`[Network error]: ${networkError}`);
  });
  

  const link = ApolloLink.from([authLink,errorLink,httpLink]); 


  const client = new ApolloClient({
    link,
    cache: new InMemoryCache(),
    
    
    
  })






  return (
    <ApolloProvider client={client}>
      <BrowserRouter>
          <Drawer/>
          <div style={{minHeight: "100vh"}}>

            <Switch>
                <Route path="/" exact component={Homepage}/>
                <Route path="/signup" component={SignUp}/>
                <Route path="/tours/:id" component={TourShow}/>
                <Route path="/tours"  component={TourList}/>
                <Route path="/cart" component={Cart}/>
               
            </Switch>
            </div>
            <Footer/>
      </BrowserRouter>
    </ApolloProvider>
  );
}

export default App;
