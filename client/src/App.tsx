import React from 'react';
import {ApolloLink, ApolloClient, InMemoryCache,createHttpLink,ApolloProvider } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { onError } from "@apollo/client/link/error";
import{BrowserRouter, Route,Switch,} from 'react-router-dom';
import './App.css';
import Drawer from './components/drawer'
import Homepage from './components/homepage'
import Footer from './components/footer';

function App() {

  const httpLink = createHttpLink({
    uri: 'http://localhost:4000/api',
    credentials:'include'
  });
  
  const token=''

  const authLink = setContext((_, { headers }) => {
    
   
    console.log(token)
     
         
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
  

  const link = ApolloLink.from([authLink,httpLink,errorLink]); 


  const client = new ApolloClient({
    link,
    cache: new InMemoryCache(),
    
    
    
  })






  return (
    <ApolloProvider client={client}>
      <BrowserRouter>
          <Drawer/>
            <Switch>
                <Homepage/>
            </Switch>
            <Footer/>
      </BrowserRouter>
    </ApolloProvider>
  );
}

export default App;
