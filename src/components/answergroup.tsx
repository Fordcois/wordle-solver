import React from "react";

// Define props type
interface PossibleAnswerProps {
    wordlist: string[];
}

// Use the defined props type
const PossibleAnswer: React.FC<PossibleAnswerProps> = ({ wordlist }) => {
const length = wordlist.length;
const othersMessage = length >= 3 ? 'others' : 'other';

    return (
<div>
    {
    length <= 2 ? (wordlist.join(' or ')) : 
    (<span>{wordlist[0]} and {length - 1} {othersMessage}</span>)
    }
</div>
);
};

export default PossibleAnswer;
