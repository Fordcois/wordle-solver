import React from "react";

// Define the type for the setWordToAnswer function
type SetWordToAnswer = (newWord: string) => void;

// Define props type
interface PossibleAnswerProps {
    wordlist: string[];
    setWordToAnswer: SetWordToAnswer;
}

// Use the defined props type
const PossibleAnswer: React.FC<PossibleAnswerProps> = ({ wordlist,setWordToAnswer}) => {

    return (
        <div className='possible-options-container' >
            {wordlist.map((word, index) => (
                <React.Fragment key={index}>
                    <span className='sugested-word' onClick={() => setWordToAnswer(word)} >
                        {word}
                    </span>
                </React.Fragment>
            ))}
        </div>
    );
};

export default PossibleAnswer;
