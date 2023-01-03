import React from "react";
import Card from 'react-bootstrap/Card';
import Button from "react-bootstrap/Button";
import axios from "axios";
import "./GameItem.css";
import StripeCheckout from 'react-stripe-checkout';
import backgroundImage from "./cool-background.png";

export class GameItem extends React.Component {
  constructor() {
    super();
    this.DeleteGame = this.DeleteGame.bind(this);
    this.handleBidSubmit = this.handleBidSubmit.bind(this); 
    this.state = {
      timeRemaining: 7 * 24 * 60 * 60 * 1000  // initialize time remaining to 7 days in milliseconds
                                              // this happens everytime you load this component so i guess you just have to leave the window open if you want the auction to end
    }
  }
  //Timer update every second and refresh to page to show the countdown
  componentDidMount() {
    this.timerID = setInterval(
      () => this.tick(),
      1000
    );
  }
  //Timer
  tick() {
    this.setState({
      timeRemaining: this.state.timeRemaining - 1000
    });
  }

  //Send the game id which you wish to delete to the server
  DeleteGame(e) {
    e.preventDefault();

    axios.delete('http://localhost:4000/api/game/' + this.props.game._id)  
      .then((res) => { this.props.Reload(); })
      .catch();
  }

  // send a PUT request to the server to update the game with the new bid amount
  handleBidSubmit(e) {
    e.preventDefault();

    axios.put('http://localhost:4000/api/game/' + this.props.game._id, {
      price: document.getElementById('bidAmount').value
    })
      .then((res) => { this.props.Reload(); })
      .catch();
  }

  render() {
    //Timer
    const days = Math.floor(this.state.timeRemaining / (1000 * 60 * 60 * 24));
    const hours = Math.floor((this.state.timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((this.state.timeRemaining % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((this.state.timeRemaining % (1000 * 60)) / 1000);
    return (

      <div style={{ background: `url(${backgroundImage}) no-repeat center center`, backgroundSize: "cover", height: "100vh" }}>
        <Card className="cards">
          <Card.Body className="card-body2">
            <label className="card-header">{this.props.game.name}</label>
            <img className="image" src={this.props.game.image} style={{ height: '400px', width: '400px' }}></img>
            <footer className="card-footer">
              {this.props.game.description}
            </footer>
            <form className="form" onSubmit={this.handleBidSubmit}> 
            <label>Time remaining: {`${days} days ${hours} hours ${minutes} minutes ${seconds} seconds`}</label> 
            <label>Current bid: ${this.props.game.price || this.props.game.startingPrice}</label>
            <label> Buy Now ${this.props.game.buyNowPrice}</label>
              <label>Enter bid amount:</label>
              <input type="number" id="bidAmount" min={isFinite(this.props.game.price) ? this.props.game.price + 1 : ''} />
              <br />
              <Button className="SubBtn" type="submit" variant="primary">Place bid</Button>
              <StripeCheckout //Stripe checkout 
                name="Games4U Co."
                description={this.props.game.title}
                amount={this.props.game.startingPrice * 100}
                token={this.onToken}
                stripeKey={process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY}
                billingAddress
                shippingAddress
              />
              <Button className="buttons" variant="danger" onClick={this.DeleteGame}>Delete</Button>
            </form>
            <div className="buttons">
            </div>
          </Card.Body>
        </Card>
      </div>
    )
  };
}
