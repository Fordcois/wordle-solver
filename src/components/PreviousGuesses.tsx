import React from "react";

interface Guess {
    letter: string;
    colour: string;
  }
  
  // Update UserWordState to reflect the correct structure
  type UserWordState = { [key: number]: Guess };
  
  interface PrevGuessDisplayProps {
    previousGuesses: UserWordState[];
  }

const PrevGuessDisplay: React.FC<PrevGuessDisplayProps> = ({previousGuesses}) => {
  return (
<div className="previous-guesses-containers">
  <div className='body-title'>Previous Guesses</div>

    {previousGuesses.length === 0?
    <div>
      <span className="small-light-font">(Previous guesses will appear here)</span>
    </div>
    :
    <div>
        {previousGuesses.map((guess, index) => (
        <div className='single-prev-guess' key={index}>
            <span style={{ color: guess[0].colour }}> {guess[0].letter} </span>
            <span style={{ color: guess[1].colour }}> {guess[1].letter}</span>
            <span style={{ color: guess[2].colour }}> {guess[2].letter}</span>
            <span style={{ color: guess[3].colour }}> {guess[3].letter}</span>
            <span style={{ color: guess[4].colour }}> {guess[4].letter}</span>
        </div>
        ))}
      </div>}
  </div>)
};

export default PrevGuessDisplay;