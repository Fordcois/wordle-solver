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

const coloursArr = ["green", "yellow", "grey"];
const changeColour = () => {
    let CurrentcolourIndex = coloursArr.indexOf(colour);
    if (CurrentcolourIndex + 1 > 2) {
      ChangeUserLetter(index, coloursArr[0], letter);
    } else {
      ChangeUserLetter(index, coloursArr[CurrentcolourIndex + 1], letter);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
      }}
    >
      <input
        style={{
          backgroundColor: colour,
          border: "2px solid black",
          padding: "5px",
          width: "20px",
          height: "20px",
          textAlign: "center",
        }}
        type="text"
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          ChangeUserLetter(index, colour, e.target.value)
        }
        maxLength={1}
        value={letter}
      />
      <span style={{backgroundColor: colour,width: "15px",height: "15px",borderRadius: "15px",marginTop: "5px",}} onClick={changeColour}>

    </span>
    </div>
  );
};

export default UserLetterSquare;
