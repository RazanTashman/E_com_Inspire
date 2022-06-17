import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {Elements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';
// import Stripe from './comp/users/stripe';

// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = loadStripe('pk_test_51I2EmfHMNxPi9ODU4HqB24duE4tbZs2cADjQyb8USqqeSeN2IWQPtUXXiAqkfuE6zucT57qClhLZiSpPCAbT35Q900Y8rcf3aF');


ReactDOM.render(
  <Elements stripe={stripePromise}>
  {/* <Stripe /> */}
   <App />
</Elements>,
  // <React.StrictMode>
  //   <App />
  // </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
