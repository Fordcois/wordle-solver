import React from "react";

type setWordToAnswer = (newWord:string) => void;
// Define props type
interface PossibleAnswerProps {
    wordlist: string[];
    listmode: boolean;
    setWordToAnswer: setWordToAnswer;
}



// Use the defined props type
const PossibleAnswer: React.FC<PossibleAnswerProps> = ({ wordlist, listmode,setWordToAnswer }) => {
    const length = wordlist.length;
    const othersMessage = length >= 3 ? 'others' : 'other';



    return (
        <div>
            <span onClick={()=>setWordToAnswer(wordlist[0]) }>{wordlist[0]}</span>
        </div>
    );
};

export default PossibleAnswer;
