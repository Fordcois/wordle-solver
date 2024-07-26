import React from "react";

// Define the type for the setWordToAnswer function
type SetWordToAnswer = (newWord: string) => void;

// Define props type
interface PossibleAnswerProps {
    wordlist: string[];
    listmode: boolean;
    setWordToAnswer: SetWordToAnswer;
}

// Use the defined props type
const PossibleAnswer: React.FC<PossibleAnswerProps> = ({ wordlist, listmode, setWordToAnswer }) => {
    const length = wordlist.length;

    // Determine the correct grammatical term based on the number of words


    return (
        <div style={{ whiteSpace: 'nowrap' }}>
            {wordlist.map((word, index) => (
                <React.Fragment key={index}>
                    <span onClick={() => setWordToAnswer(word)} >
                        {word}
                    </span>
                    {index < wordlist.length - 1 && ', '}
                </React.Fragment>
            ))}
        </div>
    );
};

export default PossibleAnswer;
