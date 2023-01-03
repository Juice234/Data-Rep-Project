import React from "react";
import backgroundImage from "./cool-background.png";

export class Basket extends React.Component {
  state = {
    name: "",
    email: "",
    shippingAddress: ""
  };

  handleInputChange = event => {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  };

  handleSubmit = event => {
    event.preventDefault();
    alert(`Thank you for your purchase, ${this.state.name}!`);
  };

  render() {
    const { game } = this.props;
    return (
      <div style={{ background: `url(${backgroundImage})`, backgroundSize: "cover" }}>
        <div className="basket-container">
          {game && (
            <div>
              <h1>{game.title}</h1>
              <img src={game.image} alt={game.title} />
              <p>{game.description}</p>
              <p>Price: ${game.price}</p>
              <form onSubmit={this.handleSubmit}>
                <label>
                  Name:
                  <input
                    type="text"
                    name="name"
                    value={this.state.name}
                    onChange={this.handleInputChange}
                  />
                </label>
                <br />
                <label>
                  Email:
                  <input
                    type="email"
                    name="email"
                    value={this.state.email}
                    onChange={this.handleInputChange}
                  />
                </label>
                <br />
                <label>
                  Shipping Address:
                  <input
                    type="text"
                    name="shippingAddress"
                    value={this.state.shippingAddress}
                    onChange={this.handleInputChange}
                  />
                </label>
                <br />
                <button type="submit">Checkout</button>
              </form>
            </div>
          )}
        </div>
      </div>
    );
  }
}
