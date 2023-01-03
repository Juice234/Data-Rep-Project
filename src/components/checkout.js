import axios from 'axios';
import React from "react";
import StripeCheckout from 'react-stripe-checkout';
import './Checkout.css';
import backgroundImage from "./cool-background.png";


export class Checkout extends React.Component {
  constructor() {
    super();
    this.componentDidMount = this.componentDidMount.bind(this);
  }
  state = {
    game: null
  };

  //Part of the stripe checkout this probably doesnt work as i dont think it can authethicate anything i just implemented it because the checkoout screen  looks nice
  //IM not going to actually deploy the app so there is no point in actually autheticating any purchase 
  onToken = (token) => {
    // Send the token to your server to process the payment
    fetch('/api/payment', {
      method: 'POST',
      body: JSON.stringify(token),
    }).then(response => {
      // Show a success message to the user
      console.log('Payment successful!');
    }).catch(error => {
      // Show an error message to the user
      console.error('Payment failed:', error);
    });
  }
  //Get the game info from the server
  componentDidMount() {
    axios.get('http://localhost:4000/api/selected-game')
      .then(response => {
        this.setState({ game: response.data });
      })
      .catch(error => {
        console.error(error);
      });
  }


  render() {
    const { game } = this.state;
    if (!game) {
      //If no game is selected display this message
      return <div style={{ background: `url(${backgroundImage}) no-repeat center center`, backgroundSize: "cover", height: "100vh" }}>There is nothing in your basket, go add some games (From the home screen)
      </div>;

    }
    return (
      //Display the currently selected game which remains selected regardless of leaving the component
      //This is where the update functionality is implemented as you can go back to the homescreen to update the selected game
      <div style={{ background: `url(${backgroundImage}) no-repeat center center`, backgroundSize: "cover", height: "100vh" }}>
        <div>
          <h1>Checkout</h1>
          <div>
            <h2>Selected Game:</h2>
            <p>Title: {game.title}</p>
            <p>Description: {game.description}</p>
            <p>Price: ${game.price}</p>
          </div>

          <StripeCheckout //Stripe checkout implemented - it requires a key in order to autheticate the purchase, i didnt bother to get a key as its there just for show really
                          //Once you click pay with card an error will popup but then the checkout window will aslo pop up allowing the user to checkout
            name="Games4U Co."
            description={game.title}
            amount={game.price } 
            token={this.onToken}
            stripeKey={process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY}
            billingAddress
            shippingAddress
          />
        </div>
      </div>
    );
  }



}
