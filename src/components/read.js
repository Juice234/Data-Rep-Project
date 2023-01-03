import React from "react";
import { Games } from "./games";
import axios from "axios";
import backgroundImage from "./cool-background.png";
import "./GameItem.css";


export class Read extends React.Component {
  constructor() {
    super();
    this.componentDidMount = this.componentDidMount.bind(this);
  }

  componentDidMount() {
    axios.get('http://localhost:4000/api/games')  // update the URL to retrieve games
      .then((response) => {
        this.setState({ games: response.data })  // update the state key to store games
      })
      .catch((error) => {
        console.log(error);
      })
  }

  state = {
    games: []  // update the initial state to an empty array of games
  }
  //Show the games added from the create or a message if no games were added
  render() {
    return (
      <div style={{ background: `url(${backgroundImage}) no-repeat center center`, backgroundSize: "cover", height: "100vh" }}>
        <h3>Welcome to the auction house here is our selection of games you can buy</h3>
        {
          this.state.games.length > 0 ?
            <Games games={this.state.games} Reload={this.componentDidMount} updateGame={this.updateGame}></Games> :
            <p>Wow So empty </p>
        }
      </div>
    );
  }
}
