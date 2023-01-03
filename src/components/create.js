import React from "react";
import axios from "axios";
import { Card, Row, Col } from "react-bootstrap";
import backgroundImage from "./cool-background.png";
import './Create.css';

export class Create extends React.Component {

  constructor() {
    super();
    this.handleSubmit = this.handleSubmit.bind(this);
    this.onChangeGameName = this.onChangeGameName.bind(this);
    this.onChangeGameDescription = this.onChangeGameDescription.bind(this);
    this.onChangeStartingPrice = this.onChangeStartingPrice.bind(this);
    this.onChangeBuyNowPrice = this.onChangeBuyNowPrice.bind(this);
    this.onChangeGameImage = this.onChangeGameImage.bind(this);

    //Setting the input fields to be blank
    this.state = {
      name: '',
      description: '',
      startingPrice: "",
      buyNowPrice: "",
      image: ''
    }
  }

  //Parsing the input file as a string
  getBase64(file, cb) {
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      cb(reader.result)
    };
    reader.onerror = (error) => {
      console.log('Error: ', error);
    };
  }

  //Send the game data to the server and reset the input fields
  //And log it to the console
  handleSubmit(e) {
    e.preventDefault();
    console.log(`Button clicked 
        ${this.state.name},
        ${this.state.description},
        ${this.state.buyNowPrice},
        ${this.state.startingPrice}`);


    const game = {
      name: this.state.name,
      description: this.state.description,
      startingPrice: this.state.startingPrice,
      buyNowPrice: this.state.buyNowPrice,
      image: this.state.image
    }

    axios.post('http://localhost:4000/api/games', game, {

    })
      .then()
      .catch();

    this.setState({
      name: '',
      description: '',
      startingPrice: "",
      buyNowPrice: "",
      image: ''
    })
  }
  // event handler methods that update the values when the input is changed
    onChangeGameImage(e) {
    let files = e.target.files;

    this.getBase64(files[0], (result) => {
      this.state.image = result;
    })
  }

  onChangeGameName(e) {
    this.setState({
      name: e.target.value
    })
  }
  onChangeGameDescription(e) {
    this.setState({
      description: e.target.value
    })
  }
  onChangeStartingPrice(e) {
    this.setState({
      startingPrice: e.target.value
    })
  }
  onChangeBuyNowPrice(e) {
    this.setState({
      buyNowPrice: e.target.value
    })
  }
  render() {
    return (
      <div style={{ background: `url(${backgroundImage}) no-repeat center center`, backgroundSize: "cover", height: "100vh" }}>
        <div className="form-container">
          
          <form className="form" onSubmit={this.handleSubmit}>
            <h3>Sell your game here</h3>
            <div className="form-group">
              <label>Add Game Name: </label>
              <input type="text"
                className="form-control"
                value={this.state.name}
                onChange={this.onChangeGameName}
              />
            </div>
            <div className="form-group">
              <label>Add Game Description: </label>
              <input type="text"
                className="form-control"
                value={this.state.description}
                onChange={this.onChangeGameDescription}
              />
            </div>
            <div className="form-group">
              <label>Add Starting Price: </label> 
              <input type="number"
                className="form-control"
                value={this.state.startingPrice} 
                onChange={this.onChangeStartingPrice}
              />
            </div>
            <div className="form-group">
              <label>Add Buy Now Price: </label> 
              <input type="number"
                className="form-control"
                value={this.state.buyNowPrice} 
                onChange={this.onChangeBuyNowPrice}
              />
            </div>
            <div className="form-group">
              <label>Add Game Image: </label>
              <input type="file"
                className="form-control"
                onChange={this.onChangeGameImage}
              />
            </div>
            <input type="submit" value="Add Game" />
          </form>
        </div>
      </div>
    );
  }


}