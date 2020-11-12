import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import{AuthProvider} from './context/token'
import{CartProvider} from './context/cart'
import {DateProvider} from './context/date';

const app=(
  <AuthProvider>
    <CartProvider>
      <DateProvider>
        <App/>
      </DateProvider>
     </CartProvider>
  </AuthProvider>
    
);

ReactDOM.render(
 app,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.

