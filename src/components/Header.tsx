'use client'
import React, { useEffect, useState } from "react";
import { FaQuestionCircle } from "react-icons/fa";

const colors = ['var(--Grey)', 'var(--Yellow)', 'var(--Green)'];

type setshowHelpPopUp = (show: boolean) => void;
interface HeaderProps {
  setshowHelpPopUp: setshowHelpPopUp;
}

const Header: React.FC<HeaderProps> = ({setshowHelpPopUp}) => {
  const [letters, setLetters] = useState([
    { char: 'S', color: 'var(--Green)' },
    { char: 'o', color: 'var(--Grey)' },
    { char: 'l', color: 'var(--Grey)' },
    { char: 'v', color: 'var(--Yellow)' },
    { char: 'r', color: 'var(--Yellow)' },
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      setLetters(prevLetters => {
        const index = Math.floor(Math.random() * prevLetters.length);
        const newColor = colors[Math.floor(Math.random() * colors.length)];
        const newLetters = [...prevLetters];
        newLetters[index] = { ...newLetters[index], color: newColor };
        return newLetters;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className='headerContainer'>
    
      
      
     <div className="Title"> 
      {letters.map((letter, index) => (
        <span key={index} style={{ color: letter.color }}>{letter.char}</span>
      ))}
    </div>
    <div className="headericon">
      <FaQuestionCircle className="PopUpReactIcon" onClick={()=>setshowHelpPopUp(true)}/>
      </div>
    </div>
  );
};

export default Header;