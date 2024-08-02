import React from "react";

// Define the type for the update function
type ChangeUserLetter = (indexToChange: number,newColour: string,newLetter: string) => void;
interface UserLetterSquareProps {
    letter: string;
    colour: string;
    index: number;
    ChangeUserLetter: ChangeUserLetter;
}

const UserLetterSquare: React.FC<UserLetterSquareProps> = ({letter,index,ChangeUserLetter,colour,}) => {

const coloursArr = ['var(--Green)', 'var(--Yellow)', 'var(--Grey)'];
const changeColour = () => {
    let CurrentcolourIndex = coloursArr.indexOf(colour);
    if (CurrentcolourIndex + 1 > 2) {
      ChangeUserLetter(index, coloursArr[0], letter);
    } else {
      ChangeUserLetter(index, coloursArr[CurrentcolourIndex + 1], letter);
    }
  };

  return (
    <div className="letterBox-Container">
      <input className="letterBox" style={{ backgroundColor: colour }} type="text"
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          ChangeUserLetter(index, colour, e.target.value)
        }
        maxLength={1}
        value={letter}
      />
      <span className='colour-change-button' style={{backgroundColor: colour}} onClick={changeColour}>
    </span>
    </div>
  );
};

export default UserLetterSquare;
