import React, { Component } from "react";
import Card from "../Card";
import "./GameContainer.css";
import clickCards from "../../clickCards.json";

class GameContainer extends Component {
  state = {
    cards: clickCards,
    score: 0
  };

  handleClick = (letter) => {
    const newCards = this.state.cards.map(card => {
      if ((card.letter === letter) && (card.clicked === false)) {
        card.clicked = true;
      } else if ((card.letter === letter) && (card.clicked === true)) {
        alert("Game Over!");
        this.resetGame();
        
      }
      return card;
    });
    
    this.setState({ 
      cards: this.shuffleArray(newCards),
      score: this.state.score + 1 
    });
  };

  shuffleArray = cards => {
    for (let i = cards.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [cards[i], cards[j]] = [cards[j], cards[i]];
    }
    return cards;
  };

  resetGame = (reset) => {
    this.setState({ 
      cards: clickCards,
      score: 0
    })
  }

  render () {
    return ( 
      <div>
        <header className = "jumbotron">
          <h1>Dogs Love Treats!</h1>
          <hr></hr>
          <h2>Memory Game</h2>
          <h2>{this.state.score} guessed correctly!  {12 - this.state.score} left to go!</h2>
        </header>
        {this.state.cards.map((card) => {
          return (
            <Card 
              key = {card.letter} 
              image = {card.image}
              clicked = {card.clicked}
              handleClick = {this.handleClick} 
              letter = {card.letter} 
            />
          );
        })}
        <footer>
          Photography by Christian Vieler. Check out his work <a href = "https://www.vieler-photography.com">here</a>.
        </footer>
      </div>
    );
  }
}

export default GameContainer;