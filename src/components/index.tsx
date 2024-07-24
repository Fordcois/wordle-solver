"use client";
import React, { useState, useMemo } from 'react';
import wordlistArr from '@/resources/wordlist';
import UserLetterSquare from './userlettersquare';
import relevantSort from '@/resources/relevant_sort';

const SolvrIndex: React.FC = () => {

type LetterInfo = {letter: string;colour: string;};
type UserWordState = {[key: number]: LetterInfo;};

const [userWord, setUserWord] = useState<UserWordState>({
    0: { letter: 'a', colour: 'grey' },
    1: { letter: 'b', colour: 'grey' },
    2: { letter: 'c', colour: 'grey' },
    3: { letter: 'd', colour: 'grey' },
    4: { letter: 'e', colour: 'grey' },
});

const [previousGuesses,setpreviousGuesses] = useState<UserWordState[]>([])

const addToPreviousGuessList = (guess:UserWordState) =>{
    let newGuessArray = [...previousGuesses];
    newGuessArray.push(guess)
    setpreviousGuesses(newGuessArray)
}

const ChangeUserLetter = (indexToChange: number, newColour: string, newLetter: string) => {
    setUserWord(prevState => ({...prevState, 
    [indexToChange]: {letter: newLetter,colour: newColour},
    }));
};

const [letterOptions, setLetterOptions] = useState<{ [key: number]: string[] }>({
    0: ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'],
    1: ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'],
    2: ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'],
    3: ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'],
    4: ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'],
});

const [confirmedLetters, setConfirmedLetters] = useState<string[]>([]);

const remainingOptions = useMemo(() => {
    return wordlistArr.filter(word =>
        letterOptions[0].includes(word[0]) &&
        letterOptions[1].includes(word[1]) &&
        letterOptions[2].includes(word[2]) &&
        letterOptions[3].includes(word[3]) &&
        letterOptions[4].includes(word[4]) &&
        confirmedLetters.every(letter => word.includes(letter))
    );
}, [letterOptions, confirmedLetters]);

const processLetter = (index: number, letter: string, colour: string) => {
    setLetterOptions((prevOptions) => {
    const newOptions = { ...prevOptions };
     // If letter is match in position
        // remove all over letters from that indexlist
    if (colour === 'green') {
        newOptions[index] = [letter];
    };
    // If Letter is a match but not at that positon
        // remove from current index
    if (colour === 'yellow') {
        const indexToRemove = newOptions[index].indexOf(letter);
        if (indexToRemove > -1) {
        newOptions[index].splice(indexToRemove, 1);
        }
        // If not already in there add the letter to the Discovered Letters List
        if(!confirmedLetters.includes(letter)){
            let newConfirmed = confirmedLetters
            newConfirmed.push(letter)
            setConfirmedLetters(newConfirmed)
        }};
    // if letter not in word
            // Remove from all options Lists if not already removed
    if (colour === 'grey') {
        for (let i = 0; i < 5; i++) {
        const indexToRemove = newOptions[i].indexOf(letter);
        if (indexToRemove > -1) {newOptions[i].splice(indexToRemove, 1);}
        };}
    return newOptions;
    });};


const ProcessUserWord =()=>{
    addToPreviousGuessList(userWord);
    for (let i = 0; i < 5; i++) {
        processLetter(i,userWord[i].letter,userWord[i].colour)
    };
};


    
const sortedWords = useMemo(() => {
    return relevantSort(remainingOptions);
  }, [remainingOptions]);
    
    



    
return (
    <div>
    
    

    <div style={{display:'flex'}}>
        <UserLetterSquare letter={userWord[0].letter} index={0} ChangeUserLetter={ChangeUserLetter} colour={userWord[0].colour} />
        <UserLetterSquare letter={userWord[1].letter} index={1} ChangeUserLetter={ChangeUserLetter} colour={userWord[1].colour} />
        <UserLetterSquare letter={userWord[2].letter} index={2} ChangeUserLetter={ChangeUserLetter} colour={userWord[2].colour} />
        <UserLetterSquare letter={userWord[3].letter} index={3} ChangeUserLetter={ChangeUserLetter} colour={userWord[3].colour} />
        <UserLetterSquare letter={userWord[4].letter} index={4} ChangeUserLetter={ChangeUserLetter} colour={userWord[4].colour} />
    </div>


    <br/>
    <button onClick={()=>ProcessUserWord()}>Process Current Word</button>
    <br/>
    {previousGuesses.length > 0 && (
                <div>
                    <b>Previous Guesses</b>
                    {previousGuesses.map((guess, index) => (
                        <div key={index}>
                            <span style={{ color: guess[0].colour }}> {guess[0].letter} </span>
                            <span style={{ color: guess[1].colour }}> {guess[1].letter}</span>
                            <span style={{ color: guess[2].colour }}> {guess[2].letter}</span>
                            <span style={{ color: guess[3].colour }}> {guess[3].letter}</span>
                            <span style={{ color: guess[4].colour }}> {guess[4].letter}</span>
                        </div>
                    ))}
                </div>
            )}

My next guess is <b>{sortedWords[0]}</b><br/>

    <br/>
    There are currently <b>{sortedWords.length}</b> remaining options<br/>
    {sortedWords.length !== 12972 && 
        sortedWords.map((word, index) => (
            <div key={index}>{word}</div>
                                        ))
    }
    </div>
    );


};

export default SolvrIndex;

