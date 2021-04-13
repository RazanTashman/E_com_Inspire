import React, { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import $ from "jquery"
import card from "../../images/credit-card.png"
// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = loadStripe('pk_test_51I2EmfHMNxPi9ODU4HqB24duE4tbZs2cADjQyb8USqqeSeN2IWQPtUXXiAqkfuE6zucT57qClhLZiSpPCAbT35Q900Y8rcf3aF');

function CheckoutForm(props) {


//   const [session, setSession] = useState("")

  const handleClick = async (event) => {
    // // Get Stripe.js instance
    const stripe = await stripePromise;

    // // Call your backend to create the Checkout Session
    // const response = await fetch(`http://localhost:5000/purchase/${props.productIds}`, { method: 'POST', body: JSON.stringify({price :props.price ,userId: localStorage.getItem("id")}) });
   
    // const session = await response.json();
    // console.log("Session:",session.id)
      $.ajax({
                        method: 'POST',
                        url: `http://localhost:5000/purchase/${props.productIds}`,
                        contentType: "application/json",
                        data: JSON.stringify({
                            price :props.price,
                            userId: localStorage.getItem("id"),
                            qty: props.qty,
                        }),
                        headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` },
                        success:async function (session) {
                            console.log("data",session.id)
                            const result = await stripe.redirectToCheckout({
                                sessionId: session.id,
                              });
                          
                              if (result.error) {
                                // If `redirectToCheckout` fails due to a browser or network
                                // error, display the localized error message to your customer
                                // using `result.error.message`.
                              }

                        },
                        error: function (err) {
                            console.log("err", err)
                            // that.setState({ emailError: err.responseText })
                        }
                    })



    // When the customer clicks on the button, redirect them to Checkout.

  };

  const buttons={
    border: "none",
    // outline: "0",
    padding: "8px",
    color:" white",
    // background: "#afacec",
    background: "black",
    // marginLeft: "2px",
    cursor: "pointer",
    // width: "120px",
    width: "70%",
    fontSize: "18px",
    height: "60px"
}

  return (
    <button role="link" 
    style ={buttons}
    onClick={handleClick}>
        <img src ={card}  style ={{width : "20%" , height: "110%", padding: "6px",}}/>
         buy For ${props.price}
    </button>
  );
}

export default CheckoutForm



// import { Link } from 'react-router-dom';
// import React, { useState, useEffect } from 'react';
// import {loadStripe} from '@stripe/stripe-js';
// import $ from "jquery"
// import cart from "../../images/cart.png"
// // import logo from "./logo.jpg"
// function AdminNav(props) {

//     function getSessionId() {
//         var that = this
//         $.ajax({
//                     method: 'GET',
//                     url: `http://localhost:5000/purchase/${props.productIds}/${localStorage.getItem("id")}`,
//                     contentType: "application/json",
//                     headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` },
//                     success: function (session) {
//                         // that.setState({ products: data })
//                         console.log("data",session.id)
//                     },
//                     error: function (err) {
//                         console.log("err", err)
//                         that.setState({ emailError: err.responseText })
//                     }
//                 })
//     }
//     var stripe = loadStripe("pk_test_51I2EmfHMNxPi9ODU4HqB24duE4tbZs2cADjQyb8USqqeSeN2IWQPtUXXiAqkfuE6zucT57qClhLZiSpPCAbT35Q900Y8rcf3aF");
//     // var checkoutButton = document.getElementById("checkout-button");
//     // var checkoutButton =   $("#checkout-button")
//     // console.log("checkoutButton",checkoutButton)
//     // checkoutButton.addEventListener('click', function () {
//         function checkoutButton(){
//         stripe.redirectToCheckout({
//             // Make the id field from the Checkout Session creation API response
//             // available to this file, so you can provide it as argument here
//             // instead of the {{CHECKOUT_SESSION_ID}} placeholder.
//             sessionId: getSessionId()
//         }).then(function (result) {
//             // If `redirectToCheckout` fails due to a browser or network
//             // error, display the localized error message to your customer
//             // using `result.error.message`.
//         });
//     }
//     // });
//     return (

//         <div  >
//             <title>Checkout</title>
//             <script src="https://js.stripe.com/v3/"></script>
//             <button onClick ={ () => checkoutButton() } id ="checkout-button"> Checkout </button>
//         </div>

//     );
// }

// export default AdminNav
///////////////////////////////////////////////////////////////////////////
// //   5376 5826 4016 9845
// import $ from "jquery"
// import React, { useState, useEffect } from "react";
// import {
//   CardElement,
//   useStripe,
//   useElements
// } from "@stripe/react-stripe-js";

// export default function CheckoutForm(props) {
//   const [succeeded, setSucceeded] = useState(false);
//   const [error, setError] = useState(null);
//   const [processing, setProcessing] = useState('');
//   const [disabled, setDisabled] = useState(true);
//   const [clientSecret, setClientSecret] = useState('');
//   const stripe = useStripe();
//   const elements = useElements();

// //   useEffect(() => {
// //     // Create PaymentIntent as soon as the page loads
// //     window
// //       .fetch("/create-payment-intent", {
// //         method: "POST",
// //         headers: {
// //           "Content-Type": "application/json"
// //         },
// //         body: JSON.stringify({items: [{ id: "xl-tshirt" }]})
// //       })
// //       .then(res => {
// //         return res.json();
// //       })
// //       .then(data => {
// //         setClientSecret(data.clientSecret);
// //       });
// //   }, []);

//   const cardStyle = {
//     style: {
//       base: {
//         color: "#32325d",
//         fontFamily: 'Arial, sans-serif',
//         fontSmoothing: "antialiased",
//         fontSize: "16px",
//         "::placeholder": {
//           color: "#32325d"
//         }
//       },
//       invalid: {
//         color: "#fa755a",
//         iconColor: "#fa755a"
//       }
//     }
//   };

//   const handleChange = async (event) => {
//     // Listen for changes in the CardElement
//     // and display any errors as the customer types their card details
//     setDisabled(event.empty);
//     setError(event.error ? event.error.message : "");
//     console.log("event.empty",event.empty)

//   };

//   const handleSubmit = async ev => {
//     console.log("clicked")
//     var that = this
//     $.ajax({
//         method: 'GET',
//         url: `http://localhost:5000/purchase/${props.productIds}/${localStorage.getItem("id")}`,
//         contentType: "application/json",
//         headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` },
//         success: function (data) {
//             // that.setState({ products: data })
//             console.log("data",data)
//         },
//         error: function (err) {
//             console.log("err", err)
//             that.setState({ emailError: err.responseText })
//         }
//     })
//     ev.preventDefault();
//     setProcessing(true);

//     const payload = await stripe.confirmCardPayment(clientSecret, {
//       payment_method: {
//         card: elements.getElement(CardElement)
//       }
//     });
//     console.log("payload", payload)
//     if (payload.error) {
//       setError(`Payment failed ${payload.error.message}`);
//       setProcessing(false);
//     } else {
//       setError(null);
//       setProcessing(false);
//       setSucceeded(true);
//     }



//   };

//   return (
//     <form id="payment-form">
//       <CardElement id="card-element" options={cardStyle} onChange={handleChange} />
//       <button  onClick={handleSubmit}
//         // disabled={processing || disabled || succeeded}
//         id="submit"
//       >
//         <span id="button-text">
//           {processing ? (
//             <div className="spinner" id="spinner"></div>
//           ) : (
//             "Pay now"
//           )}
//         </span>
//       </button>
//       {/* Show any error that happens when processing the payment */}
//       {error && (
//         <div className="card-error" role="alert">
//           {error}
//         </div>
//       )}
//       {/* Show a success message upon completion */}
//       <p className={succeeded ? "result-message" : "result-message hidden"}>
//         Payment succeeded, see the result in your
//         <a
//           href={`https://dashboard.stripe.com/test/payments`}
//         >
//           {" "}
//           Stripe dashboard.
//         </a> Refresh the page to pay again.
//       </p>
//     </form>
//   );
// }







// ///////////////////////////////////////////////////////////////////////////////








// // import React from 'react';
// // import ReactDOM from 'react-dom';
// // import {loadStripe} from '@stripe/stripe-js';
// // import $ from "jquery"
// // import {
// //   CardElement,
// //   Elements,
// //   useStripe,
// //   useElements,
// // } from '@stripe/react-stripe-js';

// // const CheckoutForm = (props) => {
// //   const stripe = useStripe();
// //   const elements = useElements();

// //   const handleSubmit = async (event) => {
// //     event.preventDefault();
// //     const {error, paymentMethod} = await stripe.createPaymentMethod({
// //       type: 'card',
// //       card: elements.getElement(CardElement),
// //     });
// //     var that = this
// //     $.ajax({
// //         method: 'GET',
// //         url: `http://localhost:5000/purchase/${props.productIds}/${localStorage.getItem("id")}`,
// //         contentType: "application/json",
// //         headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` },
// //         success: function (data) {
// //             // that.setState({ products: data })
// //             console.log(data)
// //         },
// //         error: function (err) {
// //             console.log("err", err)
// //             that.setState({ emailError: err.responseText })
// //         }
// //     })
// //     // console.log("stripe:::",stripe.confirmCardPayment())
// // //     stripe.confirmCardPayment(clientSecret).then(function(response) {
// // //         if (response.error) {
// // //           // Handle error here
// // //           console.log("Somthind Wrong" )
// // //         } else if (response.paymentIntent && response.paymentIntent.status === 'succeeded') {
// // //           // Handle successful payment here
// // //           console.log("successful" )
// // //         }
// // //             console.log("clicked",response )

// // //       });

// // //     // console.log("error",error )
// //   };

// //   return (
// //     <form onSubmit={handleSubmit}>
// //       <CardElement />
// //       <button type="submit" disabled={!stripe}>
// //         Pay
// //       </button>
// //     </form>
// //   );
// // };


// // export default CheckoutForm

// // //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// // ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// // // import { useState } from "react";
// // // import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";

// // // import axios from "axios";



// // // // const CardElementContainer = styled.div`
// // // //   height: 40px;
// // // //   display: flex;
// // // //   align-items: center;
// // // //   & .StripeElement {
// // // //     width: 100%;
// // // //     padding: 15px;
// // // //   }
// // // // `;

// // // const CheckoutForm = ({ price, onSuccessfulCheckout }) => {
// // //   const [isProcessing, setProcessingTo] = useState(false);
// // //   const stripe = useStripe();
// // //   const elements = useElements();

// // //   // TIP
// // //   // use the cardElements onChange prop to add a handler
// // //   // for setting any errors:

// // // //   const handleCardDetailsChange = ev => {
// // // //     ev.error ? setCheckoutError(ev.error.message) : setCheckoutError();
// // // //   };

// // //   const handleFormSubmit = async ev => {
// // //     ev.preventDefault();

// // //     // const billingDetails = {
// // //     //   name: ev.target.name.value,
// // //     //   email: ev.target.email.value,
// // //     //   address: {
// // //     //     city: ev.target.city.value,
// // //     //     line1: ev.target.address.value,
// // //     //     state: ev.target.state.value,
// // //     //     postal_code: ev.target.zip.value
// // //     //   }
// // //     // };

// // //     setProcessingTo(true);

// // //     const cardElement = elements.getElement("card");

// // //     try {
// // //       const { data: clientSecret } = await axios.post("/api/payment_intents", {
// // //         amount: price * 100
// // //       });

// // //       const paymentMethodReq = await stripe.createPaymentMethod({
// // //         type: "card",
// // //         card: cardElement,
// // //         // billing_details: billingDetails
// // //       });

// // //       if (paymentMethodReq.error) {

// // //         setProcessingTo(false);
// // //         return;
// // //       }

// // //       const { error } = await stripe.confirmCardPayment(clientSecret, {
// // //         payment_method: paymentMethodReq.paymentMethod.id
// // //       });

// // //       if (error) {

// // //         setProcessingTo(false);
// // //         return;
// // //       }

// // //       onSuccessfulCheckout();
// // //     } catch (err) {
// // //       console.log(err.message);
// // //     }
// // //   };

// // //   // Learning
// // //   // A common ask/bug that users run into is:
// // //   // How do you change the color of the card element input text?
// // //   // How do you change the font-size of the card element input text?
// // //   // How do you change the placeholder color?
// // //   // The answer to all of the above is to use the `style` option.
// // //   // It's common to hear users confused why the card element appears impervious
// // //   // to all their styles. No matter what classes they add to the parent element
// // //   // nothing within the card element seems to change. The reason for this is that
// // //   // the card element is housed within an iframe and:
// // //   // > styles do not cascade from a parent window down into its iframes

// // //   const iframeStyles = {
// // //     base: {
// // //       color: "#fff",
// // //       fontSize: "16px",
// // //       iconColor: "#fff",
// // //       "::placeholder": {
// // //         color: "#87bbfd"
// // //       }
// // //     },
// // //     invalid: {
// // //       iconColor: "#FFC7EE",
// // //       color: "#FFC7EE"
// // //     },
// // //     complete: {
// // //       iconColor: "#cbf4c9"
// // //     }
// // //   };

// // //   const cardElementOpts = {
// // //     iconStyle: "solid",
// // //     style: iframeStyles,
// // //     hidePostalCode: true
// // //   };

// // //   return (
// // //     <form onSubmit={handleFormSubmit}>


// // //         {/* <CardElementContainer>
// // //           <CardElement
// // //             options={cardElementOpts}
// // //             onChange={handleCardDetailsChange}
// // //           />
// // //         </CardElementContainer> */}



// // //         {/* TIP always disable your submit button while processing payments */}
// // //         <button disabled={isProcessing || !stripe}>
// // //           {isProcessing ? "Processing..." : `Pay $ 30`}
// // //         </button>

// // //     </form>
// // //   );
// // // };

// // // export default CheckoutForm;


// // //////////////////////////////////////////////////////////////////////////////////////////////////////



// // // import { loadStripe } from '@stripe/stripe-js';
// // // import { CardElement } from '@stripe/react-stripe-js';
// // // import "./stripe.css"
// // // // A reference to Stripe.js initialized with your real test publishable API key.

// // // function CheckoutForm(props) {
// // // // A reference to Stripe.js initialized with your real test publishable API key.
// // // var stripe = loadStripe("pk_test_51I2EmfHMNxPi9ODU4HqB24duE4tbZs2cADjQyb8USqqeSeN2IWQPtUXXiAqkfuE6zucT57qClhLZiSpPCAbT35Q900Y8rcf3aF");

// // // // The items the customer wants to buy
// // // var purchase = {
// // //   items: [{ id: "xl-tshirt" }]
// // // };

// // // // Disable the button until we have Stripe set up on the page
// // // // document.querySelector("button").disabled = true;
// // // fetch(`http://localhost:5000/purchase/${localStorage.getItem("id")}/${props.productIds}`, {
// // //   method: "GET",
// // //   headers: {
// // //     "Content-Type": "application/json"
// // //   },
// // // //   body: JSON.stringify(purchase)
// // // })
// // //   .then(function(result) {
// // //     return result.json();
// // //   })
// // //   .then(function(data) {
// // //     var elements = stripe.elements();

// // //     var style = {
// // //       base: {
// // //         color: "#32325d",
// // //         fontFamily: 'Arial, sans-serif',
// // //         fontSmoothing: "antialiased",
// // //         fontSize: "16px",
// // //         "::placeholder": {
// // //           color: "#32325d"
// // //         }
// // //       },
// // //       invalid: {
// // //         fontFamily: 'Arial, sans-serif',
// // //         color: "#fa755a",
// // //         iconColor: "#fa755a"
// // //       }
// // //     };

// // //     var card = elements.create("card", { style: style });
// // //     // Stripe injects an iframe into the DOM
// // //     card.mount("#card-element");

// // //     card.on("change", function (event) {
// // //       // Disable the Pay button if there are no card details in the Element
// // //       document.querySelector("button").disabled = event.empty;
// // //       document.querySelector("#card-error").textContent = event.error ? event.error.message : "";
// // //     });

// // //     var form = document.getElementById("payment-form");
// // //     form.addEventListener("submit", function(event) {
// // //       event.preventDefault();
// // //       // Complete payment when the submit button is clicked
// // //       payWithCard(stripe, card, data.clientSecret);
// // //     });
// // //   });

// // // // Calls stripe.confirmCardPayment
// // // // If the card requires authentication Stripe shows a pop-up modal to
// // // // prompt the user to enter authentication details without leaving your page.
// // // var payWithCard = function(stripe, card, clientSecret) {
// // //   loading(true);
// // //   stripe
// // //     .confirmCardPayment(clientSecret, {
// // //       payment_method: {
// // //         card: card
// // //       }
// // //     })
// // //     .then(function(result) {
// // //       if (result.error) {
// // //         // Show error to your customer
// // //         showError(result.error.message);
// // //       } else {
// // //         // The payment succeeded!
// // //         orderComplete(result.paymentIntent.id);
// // //       }
// // //     });
// // // };

// // // /* ------- UI helpers ------- */

// // // // Shows a success message when the payment is complete
// // // var orderComplete = function(paymentIntentId) {
// // //   loading(false);
// // //   document
// // //     .querySelector(".result-message a")
// // //     .setAttribute(
// // //       "href",
// // //       "https://dashboard.stripe.com/test/payments/" + paymentIntentId
// // //     );
// // //   document.querySelector(".result-message").classList.remove("hidden");
// // //   document.querySelector("button").disabled = true;
// // // };

// // // // Show the customer the error from Stripe if their card fails to charge
// // // var showError = function(errorMsgText) {
// // //   loading(false);
// // //   var errorMsg = document.querySelector("#card-error");
// // //   errorMsg.textContent = errorMsgText;
// // //   setTimeout(function() {
// // //     errorMsg.textContent = "";
// // //   }, 4000);
// // // };

// // // // Show a spinner on payment submission
// // // var loading = function(isLoading) {
// // //   if (isLoading) {
// // //     // Disable the button and show a spinner
// // //     document.querySelector("button").disabled = true;
// // //     document.querySelector("#spinner").classList.remove("hidden");
// // //     document.querySelector("#button-text").classList.add("hidden");
// // //   } else {
// // //     document.querySelector("button").disabled = false;
// // //     document.querySelector("#spinner").classList.add("hidden");
// // //     document.querySelector("#button-text").classList.remove("hidden");
// // //   }
// // // };


// // // return(
// // //     <div>
// // //           <form id="payment-form">
// // //           <CardElement
// // //                         options={{
// // //                             style: {

// // //                                 base: {

// // //                                     fontSize: '16px',
// // //                                     color: '#424770',
// // //                                     '::placeholder': {
// // //                                         color: '#aab7c4',
// // //                                     },
// // //                                 },
// // //                                 invalid: {
// // //                                     color: '#9e2146',
// // //                                 },
// // //                             },
// // //                         }}
// // //                     />
// // //       <div id="card-element"></div>
// // //       <button id="submit">
// // //         <div class="spinner hidden" id="spinner"></div>
// // //         <span id="button-text">Pay now</span>
// // //       </button>
// // //       <p id="card-error" role="alert"></p>
// // //       <p class="result-message hidden">
// // //         Payment succeeded, see the result in your
// // //         <a href="" target="_blank">Stripe dashboard.</a> Refresh the page to pay again.
// // //       </p>
// // //     </form>
// // //     </div>
// // // )
// // // }
// // // export default CheckoutForm

// // /////////////////////////////////////////////////////////////////////////////////////////////////////


// // // import React from 'react';
// // // import ReactDOM from 'react-dom';
// // // import { loadStripe } from '@stripe/stripe-js';
// // // // Make sure to call `loadStripe` outside of a component’s render to avoid
// // // // recreating the `Stripe` object on every render.
// // // const stripePromise = loadStripe('pk_test_51I2EmfHMNxPi9ODU4HqB24duE4tbZs2cADjQyb8USqqeSeN2IWQPtUXXiAqkfuE6zucT57qClhLZiSpPCAbT35Q900Y8rcf3aF');

// // // function CheckoutForm(props) {
// // //   const handleClick = async (event) => {
// // //       console.log("props:", props)
// // //     // Get Stripe.js instance
// // //     const stripe = await stripePromise;

// // //     // Call your backend to create the Checkout Session
// // //     const response = await fetch(`http://localhost:5000/purchase/${localStorage.getItem("id")}/${props.productIds}`, { method: 'GET' });

// // //     const session = await response.json();

// // //     // When the customer clicks on the button, redirect them to Checkout.
// // //     const result = await stripe.redirectToCheckout({
// // //       sessionId: session.id,
// // //     });

// // //     if (result.error) {
// // //       // If `redirectToCheckout` fails due to a browser or network
// // //       // error, display the localized error message to your customer
// // //       // using `result.error.message`.
// // //     }
// // //   };

// // //   return (
// // //     <button role="link" onClick={handleClick}>
// // //       Checkout
// // //     </button>
// // //   );
// // // }

// // // export default CheckoutForm

// // //////////////////////////////////////////////////////////////////////////////////////////////////

// // // import {CardElement, useStripe, useElements} from '@stripe/react-stripe-js';

// // // const CheckoutForm = () => {
// // //     /// obj of functions
// // //   const stripe = useStripe();
// // //   console.log("stripe::",stripe)
// // //   const elements = useElements();
// // //   console.log("elements::",elements)
// // //   const handleSubmit = async (event) => {
// // //     // Block native form submission.
// // //     event.preventDefault();

// // //     if (!stripe || !elements) {
// // //       // Stripe.js has not loaded yet. Make sure to disable
// // //       // form submission until Stripe.js has loaded.
// // //       return;
// // //     }

// // //     // Get a reference to a mounted CardElement. Elements knows how
// // //     // to find your CardElement because there can only ever be one of
// // //     // each type of element.
// // //     const cardElement = elements.getElement(CardElement);

// // //     // Use your card Element with other Stripe.js APIs
// // //     const {error, paymentMethod} = await stripe.createPaymentMethod({
// // //       type: 'card',
// // //       card: cardElement,
// // //     });

// // //     if (error) {
// // //       console.log('[error]', error);
// // //     } else {
// // //       console.log('[PaymentMethod]', paymentMethod);
// // //     }
// // //   };

// // //   return (
// // //     <form onSubmit={handleSubmit}>
// // //       <CardElement />
// // //       <button type="submit" disabled={!stripe}>
// // //         Pay
// // //       </button>
// // //     </form>
// // //   );
// // // };

// // // export default CheckoutForm