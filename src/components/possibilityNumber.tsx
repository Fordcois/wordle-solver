import React from "react";

interface PossibilitiesNumberProps {
    length: number;
}
const PossibilitiesNumber: React.FC<PossibilitiesNumberProps> = ({length}) => {
return (
    <div className="possibilities-number-container">
    {length > 1 ? 
    // More than One Remaining Option
    <div>
    <span className="green-bold">{length.toLocaleString()}</span>
    <br/>
    Remaining possibilities
    </div>:
    // Only One Option
    <div>
    Puzzle Solved
    </div>
    }
    </div>
);
};

export default PossibilitiesNumber;