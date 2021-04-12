import React from "react"
import $ from "jquery"
import close from '../../images/close.png'
import Nav from '../navBar/navBar'
import plus from "../../images/plus.png"
import minus from "../../images/minus.png"
import GooglePayButton from '@google-pay/button-react'
import CheckoutForm from './stripe';
import { CardElement } from '@stripe/react-stripe-js';

class Cart extends React.Component {
    constructor() {
        super()
        this.state = {
            products: [],
            count: 1,
            checked: false,
            order: [],
            checkedStatus: [],
            shop: [],
            total: 0,
            productIds:[],
        }
    }

    componentDidMount() {
        let that = this
        $.ajax({
            method: 'GET',
            url: `http://localhost:5000/cart/${localStorage.getItem("id")}`,
            contentType: "application/json",
            headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` },
            success: function (data) {
                that.setState({ products: data })
            },
            error: function (err) {
                console.log("err", err)
                that.setState({ emailError: err.responseText })
            }
        })
        // this.googlePay()
    }
    counter(count, id, type) {
        var that = this
        function qty() {

            if (type === "plus") {
                var q = that.state.products[count].qty + 1
                return [q, q * that.state.products[count].price]
            }

            else
                if (that.state.products[count].qty !== 0) {
                    var q = that.state.products[count].qty - 1
                    return [q, q * that.state.products[count].price]
                }
                else
                    that.state.products[count].qty = 0



        }
        var data = {
            userId: localStorage.getItem("id"),
            cartId: id,
            qty: qty()
        }
        var pre = this.state.products[count].total


        $.ajax({
            method: 'POST',
            data: JSON.stringify(data),
            url: `http://localhost:5000/qty`,
            contentType: "application/json",
            headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` },
            success: function (data) {
                var cheackBox = document.getElementById(count);
                if (cheackBox.checked)
                    that.setState({ total: that.state.total -= pre })
                that.setState({ products: data })
                if (cheackBox.checked)
                    that.checkedStatusFunc(count)


                that.setState({ products: data })


            },
            error: function (err) {
                console.log("err", err)
                that.setState({ emailError: err.responseText })

            }
        })



    }

    delete(id) {
        var that = this
        $.ajax({
            method: 'DELETE',
            url: `http://localhost:5000/cart/${id}/${localStorage.getItem('id')}`,
            contentType: "application/json",
            headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` },
            success: function (data) {
                that.setState({
                    products: data
                });
            },

            error: function (err) {
                console.log('error:', err)
            }
        })
    }

    getTheInfo(event, index) {

        this.setState({ [event.target.name]: event.target.checked });
        this.state.checkedStatus[index] = event.target.checked
        console.log("productsss:", this.state.products)
        this.checkedStatusFunc(index)
        var cheackBox = document.getElementById(index);
        if (cheackBox.checked) {
            this.state.order.push(this.state.products[index].cartId)
            this.state.shop.push(this.state.products[index].shopId)
            this.state.productIds.push(this.state.products[index].productId)
        }

        else {

            const ele = this.state.order.indexOf(this.state.products[index].cartId);
            if (ele > -1) {
                this.state.order.splice(ele, 1)
                this.state.shop.splice(ele, 1)
            }
        }
    }
    checkedStatusFunc(index) {

        var cheackBox = document.getElementById(index);

        if (cheackBox.checked)
            this.setState({ total: this.state.total += this.state.products[index].total })

        else
            this.setState({ total: this.state.total -= this.state.products[index].total })
    }

    // ***************************************************************************** */
    // googlePay() {

    //     /**
    //      * Define the version of the Google Pay API referenced when creating your
    //      * configuration
    //      *
    //      * @see {@link https://developers.google.com/pay/api/web/reference/request-objects#PaymentDataRequest|apiVersion in PaymentDataRequest}
    //      */
    //     const baseRequest = {
    //         apiVersion: 2,
    //         apiVersionMinor: 0
    //     };

    //     /**
    //      * Card networks supported by your site and your gateway
    //      *
    //      * @see {@link https://developers.google.com/pay/api/web/reference/request-objects#CardParameters|CardParameters}
    //      * @todo confirm card networks supported by your site and gateway
    //      */
    //     const allowedCardNetworks = ["AMEX", "DISCOVER", "INTERAC", "JCB", "MASTERCARD", "VISA"];

    //     /**
    //      * Card authentication methods supported by your site and your gateway
    //      *
    //      * @see {@link https://developers.google.com/pay/api/web/reference/request-objects#CardParameters|CardParameters}
    //      * @todo confirm your processor supports Android device tokens for your
    //      * supported card networks
    //      */
    //     const allowedCardAuthMethods = ["PAN_ONLY", "CRYPTOGRAM_3DS"];

    //     /**
    //      * Identify your gateway and your site's gateway merchant identifier
    //      *
    //      * The Google Pay API response will return an encrypted payment method capable
    //      * of being charged by a supported gateway after payer authorization
    //      *
    //      * @todo check with your gateway on the parameters to pass
    //      * @see {@link https://developers.google.com/pay/api/web/reference/request-objects#gateway|PaymentMethodTokenizationSpecification}
    //      */
    //     const tokenizationSpecification = {
    //         type: 'PAYMENT_GATEWAY',
    //         parameters: {
    //             // 'gateway': 'example',
    //             // 'gatewayMerchantId': 'exampleGatewayMerchantId'
    //         }
    //     };

    //     /**
    //      * Describe your site's support for the CARD payment method and its required
    //      * fields
    //      *
    //      * @see {@link https://developers.google.com/pay/api/web/reference/request-objects#CardParameters|CardParameters}
    //      */
    //     const baseCardPaymentMethod = {
    //         type: 'CARD',
    //         parameters: {
    //             allowedAuthMethods: allowedCardAuthMethods,
    //             allowedCardNetworks: allowedCardNetworks
    //         }
    //     };

    //     /**
    //      * Describe your site's support for the CARD payment method including optional
    //      * fields
    //      *
    //      * @see {@link https://developers.google.com/pay/api/web/reference/request-objects#CardParameters|CardParameters}
    //      */
    //     const cardPaymentMethod = Object.assign(
    //         {},
    //         baseCardPaymentMethod,
    //         {
    //             tokenizationSpecification: tokenizationSpecification
    //         }
    //     );

    //     /**
    //      * An initialized google.payments.api.PaymentsClient object or null if not yet set
    //      *
    //      * @see {@link getGooglePaymentsClient}
    //      */
    //     let paymentsClient = null;

    //     /**
    //      * Configure your site's support for payment methods supported by the Google Pay
    //      * API.
    //      *
    //      * Each member of allowedPaymentMethods should contain only the required fields,
    //      * allowing reuse of this base request when determining a viewer's ability
    //      * to pay and later requesting a supported payment method
    //      *
    //      * @returns {object} Google Pay API version, payment methods supported by the site
    //      */
    //     function getGoogleIsReadyToPayRequest() {
    //         return Object.assign(
    //             {},
    //             baseRequest,
    //             {
    //                 allowedPaymentMethods: [baseCardPaymentMethod]
    //             }
    //         );
    //     }

    //     /**
    //      * Configure support for the Google Pay API
    //      *
    //      * @see {@link https://developers.google.com/pay/api/web/reference/request-objects#PaymentDataRequest|PaymentDataRequest}
    //      * @returns {object} PaymentDataRequest fields
    //      */
    //     function getGooglePaymentDataRequest() {
    //         const paymentDataRequest = Object.assign({}, baseRequest);
    //         paymentDataRequest.allowedPaymentMethods = [cardPaymentMethod];
    //         paymentDataRequest.transactionInfo = getGoogleTransactionInfo();
    //         paymentDataRequest.merchantInfo = {
    //             // @todo a merchant ID is available for a production environment after approval by Google
    //             // See {@link https://developers.google.com/pay/api/web/guides/test-and-deploy/integration-checklist|Integration checklist}
    //             // merchantId: '12345678901234567890',
    //             // merchantName: 'Example Merchant'
    //         };
    //         return paymentDataRequest;
    //     }

    //     /**
    //      * Return an active PaymentsClient or initialize
    //      *
    //      * @see {@link https://developers.google.com/pay/api/web/reference/client#PaymentsClient|PaymentsClient constructor}
    //      * @returns {google.payments.api.PaymentsClient} Google Pay API client
    //      */


    //     function getGooglePaymentsClient() {
    //         if (paymentsClient === null) {
    //             paymentsClient = new window.google.payments.api.PaymentsClient({ environment: 'TEST' });
    //         }
    //         return paymentsClient;
    //     }

    //     /**
    //      * Initialize Google PaymentsClient after Google-hosted JavaScript has loaded
    //      *
    //      * Display a Google Pay payment button after confirmation of the viewer's
    //      * ability to pay.
    //      */


    //     function onGooglePayLoaded() {
    //         const paymentsClient = getGooglePaymentsClient();
    //         paymentsClient.isReadyToPay(getGoogleIsReadyToPayRequest())
    //             .then(function (response) {
    //                 if (response.result) {
    //                     addGooglePayButton();
    //                     // @todo prefetch payment data to improve performance after confirming site functionality
    //                     // prefetchGooglePaymentData();
    //                 }
    //             })
    //             .catch(function (err) {
    //                 // show error in developer console for debugging
    //                 console.error(err);
    //             });
    //     }
    //     onGooglePayLoaded()
    //     /**
    //      * Add a Google Pay purchase button alongside an existing checkout button
    //      *
    //      * @see {@link https://developers.google.com/pay/api/web/reference/request-objects#ButtonOptions|Button options}
    //      * @see {@link https://developers.google.com/pay/api/web/guides/brand-guidelines|Google Pay brand guidelines}
    //      */
    //     function addGooglePayButton() {
    //         const paymentsClient = getGooglePaymentsClient();
    //         const button =
    //             paymentsClient.createButton({ onClick: onGooglePaymentButtonClicked });
    //         document.getElementById('containerBut').appendChild(button);
    //     }

    //     /**
    //      * Provide Google Pay API with a payment amount, currency, and amount status
    //      *
    //      * @see {@link https://developers.google.com/pay/api/web/reference/request-objects#TransactionInfo|TransactionInfo}
    //      * @returns {object} transaction info, suitable for use as transactionInfo property of PaymentDataRequest
    //      */
    //     function getGoogleTransactionInfo() {
    //         return {
    //             totalPriceStatus: 'FINAL',
    //             totalPriceLabel: 'Total',
    //             totalPrice: '0.1',
    //             currencyCode: 'JOD',
    //             countryCode: 'JO',
    //         };
    //     }

    //     /**
    //      * Prefetch payment data to improve performance
    //      *
    //      * @see {@link https://developers.google.com/pay/api/web/reference/client#prefetchPaymentData|prefetchPaymentData()}
    //      */
    //     function prefetchGooglePaymentData() {
    //         const paymentDataRequest = getGooglePaymentDataRequest();
    //         // transactionInfo must be set but does not affect cache
    //         paymentDataRequest.transactionInfo = {
    //             totalPriceStatus: 'FINAL',
    //             currencyCode: 'JOD',
    //             // countryCode: 'JO',

    //         };
    //         const paymentsClient = getGooglePaymentsClient();
    //         paymentsClient.prefetchPaymentData(paymentDataRequest);
    //     }

    //     /**
    //      * Show Google Pay payment sheet when Google Pay payment button is clicked
    //      */
    //     function onGooglePaymentButtonClicked() {
    //         const paymentDataRequest = getGooglePaymentDataRequest();
    //         paymentDataRequest.transactionInfo = getGoogleTransactionInfo();

    //         const paymentsClient = getGooglePaymentsClient();
    //         paymentsClient.loadPaymentData(paymentDataRequest)
    //             .then(function (paymentData) {
    //                 // handle the response
    //                 processPayment(paymentData);
    //             })
    //             .catch(function (err) {
    //                 // show error in developer console for debugging
    //                 console.error(err);
    //             });
    //     }
    //     /**
    //      * Process payment data returned by the Google Pay API
    //      *
    //      * @param {object} paymentData response from Google Pay API after user approves payment
    //      * @see {@link https://developers.google.com/pay/api/web/reference/response-objects#PaymentData|PaymentData object reference}
    //      */
    //     function processPayment(paymentData) {
    //         // show returned data in developer console for debugging
    //         console.log(paymentData);
    //         // @todo pass payment token to your gateway to process payment
    //         const paymentToken = paymentData.paymentMethodData.tokenizationData.token;

    //     }
    // }
    // ***************************************************************************************************



    // googlePay() {
    //     // To declare API versions
    //     const baseRequest = {
    //         apiVersion: 2,
    //         apiVersionMinor: 0
    //     };

    //  // initialize a PaymentsClient object & Initial development uses a TEST environment
    //  const paymentsClient =
    //  new window.google.payments.api.PaymentsClient({ environment: 'TEST' });


    //         //Define the card networks accepted by your site
    //         const allowedCardNetworks = ["AMEX", "DISCOVER", "INTERAC", "JCB", "MASTERCARD", "VISA"];

    //         //auth methods (PAN: plain card numbers, CRYPT_3DS: mobile-based tokenization)
    //         const allowedCardAuthMethods = ["PAN_ONLY", "CRYPTOGRAM_3DS"];

    //              const baseCardPaymentMethod = {
    //   type: 'CARD',
    //   parameters: {
    //     allowedAuthMethods: allowedCardAuthMethods,
    //     allowedCardNetworks: allowedCardNetworks
    //   }
    // };

    //     //Adding the allowed payment methods to the base request object.
    //     const isReadyToPayRequest = Object.assign({}, baseRequest);
    //     isReadyToPayRequest.allowedPaymentMethods = [baseCardPaymentMethod];

    //     //to determine if the Google Pay API is supported by the current device and browser for your specified payment methods
    //     paymentsClient.isReadyToPay(isReadyToPayRequest)
    //         .then(function (response) {
    //             if (response.result) {
    //                 // add a Google Pay payment button
    //                 const button =
    //                     paymentsClient.createButton({ onClick: () => onGooglePaymentButtonClicked() });
    //                 document.getElementById('containerBut').appendChild(button);
    //             }
    //         })
    //         .catch(function (err) {
    //             // show error in developer console for debugging
    //             console.error(err);
    //         });




    //  function   onGooglePaymentButtonClicked(){
    //     console.log("cklicked")
    //         const tokenizationSpecification = {
    //             type: 'PAYMENT_GATEWAY',
    //             parameters: {
    //                 gateway: 'aciworldwide',
    //                 gatewayMerchantId: '9952036207'
    //             }
    //         };


    //         //To describe your allowed payment methods


    //         const cardPaymentMethod = Object.assign(
    //             { tokenizationSpecification: tokenizationSpecification },
    //             baseCardPaymentMethod
    //         );


    //         // function onGooglePayLoaded() {
    //         //     window.googlePayClient = new google.payments.api.PaymentsClient({
    //         //         environment: "TEST"
    //         //     });
    //         // }

    //         // Create a PaymentDataRequest object

    //         const paymentDataRequest = Object.assign({}, baseRequest);
    //         paymentDataRequest.allowedPaymentMethods = [cardPaymentMethod];


    //         paymentDataRequest.transactionInfo = {
    //             totalPriceStatus: 'FINAL',
    //             totalPriceLabel: 'Total',
    //             totalPrice: '0.1',
    //             currencyCode: 'JOD',
    //             countryCode: 'JO',
    //         };
    //         //*****************************************
    //         paymentDataRequest.merchantInfo = {
    //             merchantName: 'Example Merchant',
    //             merchantId: '12345678901234567890'
    //         };
    //         //**************************************** 

    //     }

    // }

    purchase() {
        var that = this
        var data = {
            userId: localStorage.getItem("id"),
            cartId: this.state.order,
            shopId: this.state.shop,
        }
        console.log("purchase", data)

        $.ajax({
            method: 'POST',
            data: JSON.stringify(data),
            url: `http://localhost:5000/addorder`,
            contentType: "application/json",
            headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` },
            success: function (data) {
                for (var i = 0; i < that.state.order.length; i++) {
                    // that.delete(that.state.order[i])
                }

            },
            error: function (err) {
                console.log("err", err)
                that.setState({ emailError: err.responseText })

            }
        })

    }
    render() {
        const closeStyling = {

            width: "1%",
            marginRight: "-5%",
            cursor: "pointer",
        }

        const header = {
            color: "#5c7f3f",
            marginTop: "20%"
        }

        const border = {
            border: "1px solid #ccc",
            borderRadius: "15px",
            margin: "3%",
            marginTop: "-1%",
        }

        const buttons = {
            padding: "5px",
            cursor: "pointer",
            width: "8%",
            height: "8%",
        }
        return (
            <div>
                <Nav />
                {/* <br /><br />  <br /><br />  <br /><br /> */}
                {/* <h1>{this.state.total}</h1> */}

                <div style={{ marginTop: "8%" }}></div>
                {this.state.products.map((product, index) => {
                    return (<div className="container" >
                        <div className="row " style={border}>

                            <div style={{ marginTop: "-18%" }}>
                                <div style={{ marginTop: "19%" }}>

                                    <input type="checkbox" id={index} style={{ marginRight: "90%" }} onChange={(e) => this.getTheInfo(e, index)} />

                                    <img src={close} onClick={() => this.delete(product.cartId)} style={closeStyling} />
                                </div>
                                <div className="col-sm-6" style={{ marginLeft: "10%" }}  >
                                    <div style={{ marginTop: "13%" }}>


                                        {/* <img src={URL.createObjectURL(new Blob([new Uint8Array(product.image.data)], { type: "image" }))} style={{ marginTop: "2%", marginLeft: "2%", width: "30%" }} alt="Image" /> */}
                                        <img src={product.image} style={{ marginTop: "2%", marginLeft: "2%", width: "30%" }} alt="Image" />
                                        <div style={{ width: "70%", marginLeft: "13%" }}>
                                            <br />
                                            <h6 style={{ color: "gray", fontSize: "15px" }}> <b style={{ color: "rgb(92, 91, 91)" }} ></b>{product.description}</h6>
                                        </div>
                                    </div>
                                </div >
                                <div className="col-sm-6" style={{ marginLeft: "-30%" }} >
                                    <div style={{ marginTop: "15%" }}>
                                        <h1 style={header}>{product.shopeName}</h1>
                                        <br />
                                        <h2 style={{ color: "black", fontSize: "22px" }}> <b style={{ color: "rgb(92, 91, 91)" }}></b> {product.productName}</h2>
                                        <br />
                                        <h2 style={{ color: "gray", fontSize: "22px" }}> <b style={{ color: "rgb(92, 91, 91)" }} ></b>{product.price} $</h2>

                                        <div className='row' style={{ marginTop: "5%", marginLeft: "42%" }}>

                                            <img onClick={() => this.counter(index, product.cartId, "minus")} style={buttons} src={minus} />
                                            <p style={{ paddingLeft: "12px", paddingRight: "12px", fontSize: "18px", border: "1px solid #ccc" }} >{product.qty}</p>
                                            <img onClick={() => this.counter(index, product.cartId, "plus")} style={buttons} src={plus} />
                                        </div>
                                        <p style={{ fontSize: "16px" }}>Total: {product.total}</p>
                                        <CheckoutForm 
                                        productIds = {product.productId}  
                                        price = {product.total}/>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    )
                })
                }
                {/* <div className ="fixed-bottom" style ={{color:"white",padding:"10px" ,marginRight:"10%", background:"gray"}} > */}
                <h1 className="fixed-bottom" style={{ border: "1px solid #ccc", borderRadius: "15px", color: "white", padding: "10px", marginLeft: "86%", width: "9%", background: "#817ce9" }}>{this.state.total}</h1>
                {/* </div> */}

                {/* <button onClick={() => this.purchase()}>purchase</button>
                <div id="containerBut"></div> */}


                {/* <script async
                    src="https://pay.google.com/gp/p/js/pay.js"
                    onload="onGooglePayLoaded()"></script> */}

                <div>
                    {/* <CardElement
                        options={{
                            style: {
                               
                                base: {
                                   
                                    fontSize: '16px',
                                    color: '#424770',
                                    '::placeholder': {
                                        color: '#aab7c4',
                                    },
                                },
                                invalid: {
                                    color: '#9e2146',
                                },
                            },
                        }}
                    /> */}
                    <CheckoutForm 
                    productIds = {this.state.productIds}  
                    price = {this.state.total}/>

                    {/* <br /><br /> */}


                    {/* <GooglePayButton
                        environment="TEST"
                        paymentRequest={{
                            apiVersion: 2,
                            apiVersionMinor: 0,
                            allowedPaymentMethods: [
                                {
                                    type: 'CARD',
                                    parameters: {
                                        allowedAuthMethods: ['PAN_ONLY', 'CRYPTOGRAM_3DS'],
                                        allowedCardNetworks: ['MASTERCARD', 'VISA'],
                                    },
                                    tokenizationSpecification: {
                                        type: 'PAYMENT_GATEWAY',
                                        // parameters: {
                                        //   gateway: 'example',
                                        //   gatewayMerchantId: 'exampleGatewayMerchantId',
                                        // },
                                    },
                                },
                            ],
                            merchantInfo: {
                                merchantId: '12345678901234567890',
                                merchantName: 'Demo Merchant',
                            },
                            transactionInfo: {
                                totalPriceStatus: 'FINAL',
                                totalPriceLabel: 'Total',
                                totalPrice: `${this.state.total}`,
                                currencyCode: 'JOD',
                                countryCode: 'JO',
                            },
                            shippingAddressRequired: true,
                            callbackIntents: ['SHIPPING_ADDRESS', 'PAYMENT_AUTHORIZATION'],
                        }}
                        onLoadPaymentData={paymentRequest => {
                            console.log('Success', paymentRequest);
                        }}
                        onPaymentAuthorized={paymentData => {

                            console.log('Payment Authorised Success', paymentData)
                            return { transactionState: 'SUCCESS' }
                        }
                        }
                        onPaymentDataChanged={paymentData => {
                            console.log('On Payment Data Changed', paymentData)
                            return {}
                        }
                        }
                        existingPaymentMethodRequired='false'
                        buttonColor='black'
                        buttonType='Buy' 
                    />*/}
                </div>
            </div>)
    }
}

export default Cart