import React, {useState} from "react";
import { AiFillGithub } from "react-icons/ai";
import { FaGlobeEurope } from "react-icons/fa";
import { IoIosMail } from "react-icons/io";
import { SiKofi } from "react-icons/si";
import PossibleAnswer from "./answergroup";

type SetWordToAnswer = (newWord: string) => void;
interface RemainingOptionsProps {
    groupedWords: string[][];
    setWordToAnswer:setWordToAnswer;
  }
const RemainingOptions: React.FC<RemainingOptionsProps> = ({groupedWords,setWordToAnswer}) => {

    const [answersToShow,setanswersToShow] = useState<number>(0);
    
    const ShowMoreAnswers=(showExtra:number) => {
        if (answersToShow+showExtra < groupedWords.length){setanswersToShow(answersToShow+showExtra)}
        else {setanswersToShow(groupedWords.length)}
    }


return (
<div className="">
{groupedWords.slice(1,answersToShow).map((group, index) => (
    <PossibleAnswer key={index} wordlist={group} setWordToAnswer={setWordToAnswer}/>))
    }

<button className='button-Green' onClick={()=>ShowMoreAnswers(10)}>Show Next Ten</button>
</div>
  );
};

export default RemainingOptions;