import React from "react";
import './Content.css';
import backgroundImage from "./cool-background.png";
import { Card, Row, Col } from "react-bootstrap";
import axios from 'axios';


export class Content extends React.Component {
  state = {
    //An array of games for the homescreen
    //I didnt source this to a json as there are only a few games
    games: [
      {
        title: "The Last of Us Part II",
        description: "Experience the breathtaking story of Ellie and Joel in a post-apocalyptic world overrun by infected.",
        price: 59.99,
        image: "https://cdn.wccftech.com/wp-content/uploads/2019/09/tlou_part_II_standard.png"
      },
      {
        title: "Cyberpunk 2077",
        description: "Dive into the neon-soaked world of Night City and become a cybernetic mercenary in this open-world RPG.",
        price: 49.99,
        image: "https://upload.wikimedia.org/wikipedia/en/thumb/9/9f/Cyberpunk_2077_box_art.jpg/220px-Cyberpunk_2077_box_art.jpg"
      },
      {
        title: "Super Mario 3D World + Bowser's Fury",
        description: "Join Mario and friends for thrilling, action-packed adventures in this enhanced version of the classic game.",
        price: 59.99,
        image: "https://assets-prd.ignimgs.com/2020/09/04/switch-supermario3dworldbowsersfury-artwork-01-1599185344908.jpg"
      },
      {
        title: "Ghost of Tsushima",
        description: "Become the ghost and fight to defend Tsushima as the island's last samurai during the first Mongol invasion of Japan.",
        price: 39.99,
        image: "https://image.api.playstation.com/vulcan/ap/rnd/202108/0410/0Jz6uJLxOK7JOMMfcfHFBi1D.png"
      }
    ],
    selectedGame: null
  };
  //Send the selected game to the server 
  handleAddToCart = (game) => {
    axios.post('http://localhost:4000/api/cart', { game: game })
      .then(response => {
        console.log(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  }


  render() {
    return (
      <div>
        <div style={{ background: `url(${backgroundImage}) no-repeat center center`, backgroundSize: "cover", height: "100vh" }}>
          <h1>Welcome to the Video Game Store!</h1>
          <p>
            We have a huge selection of the latest and greatest video games for all
            platforms. Browse our catalog to find the perfect game for you.
          </p>
          <h2>Featured Games:</h2>
          <div className="featured-games">
            {this.state.games.map(game => (
              <Col xs={6} md={4} lg={3} key={game.title}>
                <Card className="featured-game-card" style={{ marginBottom: "1rem" }}>
                  <Card.Img variant="top" src={game.image} />
                  <Card.Body>
                    <Card.Title>{game.title}</Card.Title>
                    <Card.Text style={{ color: "black" }}>
                      {game.description}
                      <br />
                      Price: ${game.price}
                    </Card.Text>
                    <button className="add-to-cart-button" onClick={() => this.handleAddToCart(game)}>Add to Cart</button>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </div>
        </div>

      </div>
    );
  }
} 