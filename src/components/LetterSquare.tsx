"use client";
import React, { useState, useEffect, useRef } from 'react';

type ChangeUserLetter = (indexToChange: number, newColour: string, newLetter: string) => void;

interface LetterSquareProps {
  letter: string;
  colour: string;
  index: number;
  ChangeUserLetter: ChangeUserLetter;
}

const LetterSquare: React.FC<LetterSquareProps> = ({ letter, colour, index, ChangeUserLetter }) => {
  const [isLeaving, setIsLeaving] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const prevColorRef = useRef(colour);

  useEffect(() => {
    const colorChanged = colour !== prevColorRef.current;
    prevColorRef.current = colour;

    if (colorChanged) {
      setIsLeaving(false);
      setTimeout(() => setIsLeaving(false), 0);
    }

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [colour]);

  const coloursArr = ['var(--Green)', 'var(--Yellow)', 'var(--Grey)'];

  const changeColour = () => {
    let CurrentcolourIndex = coloursArr.indexOf(colour);
    if (CurrentcolourIndex + 1 > 2) {
      ChangeUserLetter(index, coloursArr[0], letter);
    } else {
      ChangeUserLetter(index, coloursArr[CurrentcolourIndex + 1], letter);
    }
  };

  const updateColour = () => {
    if (!isLeaving) {
      setIsLeaving(true);
      timeoutRef.current = setTimeout(() => {
        changeColour();
      }, 250); // Match this to your flip-leave animation duration
    }
  };

  return (
    <div className="letterBox-Container">
      <input 
        className={`letterBox ${isLeaving ? 'flip-leave' : 'flip-start'}`}
        style={{ backgroundColor: colour }}
        type="text"
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          ChangeUserLetter(index, colour, e.target.value);
        }}
        maxLength={1}
        value={letter}
      />
      <span 
        className='colour-change-button' 
        style={{backgroundColor: colour}} 
        onClick={updateColour}
      ></span>
    </div>
  );
};

export default LetterSquare;