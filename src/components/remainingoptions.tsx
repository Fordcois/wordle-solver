import React, {useState, useEffect} from "react";
import PossibleAnswer from "./answergroup";

type setWordToAnswer = (newWord: string) => void;
interface RemainingOptionsProps {
    groupedWords: string[][];
    setWordToAnswer:setWordToAnswer;

  }
const RemainingOptions: React.FC<RemainingOptionsProps> = ({groupedWords,setWordToAnswer}) => {

    const [answersToShow,setanswersToShow] = useState<number>(0);
    const shownAnswers = Math.min(answersToShow, groupedWords.length);

    useEffect(() => {
        setanswersToShow(5);
    }, [groupedWords]);
    
    const ShowMoreAnswers=(showExtra:number) => {
        if (answersToShow+showExtra < groupedWords.length){setanswersToShow(answersToShow+showExtra)}
        else {setanswersToShow(groupedWords.length)}
    }

return (
<div style={{width:'100%', height: '100%', display: 'flex', flexDirection: 'column'}}>
    <div className="five-padding">
        <span className='body-title'>Showing {shownAnswers.toLocaleString()} suggestions... </span>
        <span className="small-light-font">(</span>
        <span className="small-light-font-link"onClick={()=>ShowMoreAnswers(5)}>Show More</span>
        <span className="small-light-font">)</span>
    </div>

    <div className="remaining-options-area">
        {groupedWords.slice(1, answersToShow).map((group, index) => (
            <PossibleAnswer key={index} wordlist={group} setWordToAnswer={setWordToAnswer} />
        ))}
    </div>
</div>
  );
};

export default RemainingOptions;