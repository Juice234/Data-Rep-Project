import React from "react";
import {GameItem} from './gameitem';  

export class Games extends React.Component{
  render(){
    //Map the game array and return a gameitem component
    return this.props.games.map(
      (game)=>{
        return <GameItem game={game} key={game._id} Reload={this.props.Reload}  />
     }
    );
  }
}

