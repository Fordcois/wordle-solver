import React, {useState} from "react";
import PossibleAnswer from "./answergroup";

type setWordToAnswer = (newWord: string) => void;
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
    <div>

<button className='button-Green' onClick={()=>ShowMoreAnswers(10)}>Show Next Ten</button>

    <div className="remaining-options-area">
        {groupedWords.slice(1,answersToShow).map((group, index) => (
            <PossibleAnswer key={index} wordlist={group} setWordToAnswer={setWordToAnswer}/>))
            }
    </div>
</div>
  );
};

export default RemainingOptions;