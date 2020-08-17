import React from 'react';

import './game.styles.scss';

import Card from '../card/card.component';
import Input from '../input/input.component';
import Stats from '../stats/stats.component';

class Game extends React.Component {
  constructor() {
    super();
    this.state = {
      cards: [],
      clickedCards: [],
      numberOfPairs: 0,
      matchedPairs: 0,
      showGame: false,
      seconds: 0,
    }
    this.timer = 0;
  }

  startTimer = () => {
    this.timer = setInterval(() => {
      this.setState(prevState => {
        return { seconds: prevState.seconds + 1 };
      });
    }, 1000);
  }

  stopTimer = () => {
    clearInterval(this.timer);
  }

  startGame = numberOfPairs => {
    this.setState({ numberOfPairs, showGame: true }, 
      () => {
        this.generateCards(numberOfPairs);
        this.startTimer();
      });
  }

  generateCards = (pairs) => {
    const cards = [];
    let id = 1;
    let value = 1;

    for(let i = 0; i < pairs; i += 1) {
      for(let x = 0; x < 2; x += 1) {
        cards.push({
          id,
          value,
          isClicked: false,
          isMatched: false,
        });
        id = id += 1;
      }
      value = value += 1;
    }

    cards.sort(() => 0.5 - Math.random());
    this.setState({ cards });
  }

  renderCards = () => {
    const { cards, clickedCards } = this.state;
  
    return cards.map(card => {
      const isClicked = clickedCards.some(clickedCard => clickedCard.id === card.id);

      return (
        <Card 
          key={card.id} 
          card={{...card, isClicked }}
          onClick={this.handleCardClick}
        />
      )
    })
  }

  handleCardClick = clickedCard => {
    let cards = this.state.cards;
    let clickedCards = this.state.clickedCards;
    clickedCards.push(clickedCard);

    if(clickedCards.length === 2) {
      // check if match
      if(clickedCards[0].value === clickedCards[1].value) {
        const filteredCards = cards.map(card => clickedCard.value === card.value ? {...card, isMatched: true} : card );
        cards = filteredCards;
        clickedCards = [];

        this.setState(prevState => {
          return { matchedPairs: prevState.matchedPairs + 1}
        }, () => {
          const { matchedPairs, numberOfPairs } = this.state;
          if(matchedPairs === numberOfPairs) {
            alert(`WOHOHO! :D You made it in ${this.state.seconds} seconds.`)
            this.stopTimer();
          }
        });
      } else {
        this.setState({ clickedCards });
        setTimeout(() => { this.setState({ clickedCards: [] }) }, 500);
        return;
      }
    }

    if(clickedCards.length > 2) {
      clickedCards = clickedCards.filter(card => clickedCard.id !== card.id)
    }

    this.setState({ clickedCards, cards });
  }

  render() {
    const { seconds, showGame, numberOfPairs, matchedPairs } = this.state;
    const cards = this.renderCards();

    return(
      <div>
        <Stats seconds={seconds} numberOfPairs={numberOfPairs} matchedPairs={matchedPairs} />
        <h1>Memory Game</h1>
        {showGame ?
        <div className='cards'>
          {cards}
        </div>
        :
        <Input startGame={this.startGame} />
        }
      </div>
    );
  }
}

export default Game;