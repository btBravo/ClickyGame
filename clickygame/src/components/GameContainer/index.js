import React, { Component } from "react";
import Card from "../Card";
import Modal from "../Modal";
import "./GameContainer.css";
import clickCards from "../../clickCards.json";

class GameContainer extends Component {

  constructor(props) {
    super(props);
    this.state = {
      cards: clickCards,
      score: 0,
      isWinner: false,
      showModal: false
    };
  }


  // shuffleArray uses the Durstenfeld Shuffle optimization of the Fisher-Yates Shuffle 
  // to randomly shuffle the array of cards and return the new array
  shuffleArray = cards => {
    for (let i = cards.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [cards[i], cards[j]] = [cards[j], cards[i]];
    }
    return cards;
  };


  //resetArray resets the clicked booleans to false and re-maps the cards for the nexy guess
  resetGame = () => {
    var resetCards = this.state.cards.map(card => {
      if (card.clicked === true) {
        card.clicked = false;
      }
      return card;
    });
    this.setState({ 
      cards: this.shuffleArray(resetCards)
    })
  }


  // increaseScore inscreases the score state by 1 each time a correct guess is made
  increaseScore = () => {
    this.setState({
      score: this.state.score + 1
    })
  }
  

  // resetScore the score state back to 0 when game is lost or reloaded
  resetScore = () => {
    this.setState({
      score: 0
    })
  }

  showModal = () => {
    this.setState({
      showModal: true
    })
  }

  winGame = () => {
    this.setState({
      isWinner: true
    })
  }

  // Each time state updates check to see if the score is 12
  componentDidUpdate(){
    if (this.state.score === 12) {
      this.resetGame();
      this.resetScore();
      this.winGame();
      this.showModal();
    }
  }

  // handleClick function to handle user click event 
  handleClick = (letter) => {
    var newCards = this.state.cards.map(card => {
      if ((card.letter === letter) && (card.clicked === false)) {
        card.clicked = true;
        this.increaseScore();
      } else if ((card.letter === letter) && (card.clicked === true)) {
        this.showModal();
        this.resetGame();
        this.resetScore();
      }
      return card;
    });
    this.setState({ 
      cards: this.shuffleArray(newCards)
    });
  };


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
        <Modal
          isWinner = {this.state.isWinner}
          visible = {this.state.showModal}
        />
      </div>
    );
  }
}

export default GameContainer;