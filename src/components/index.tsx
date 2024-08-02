"use client";
import React, { useState, useMemo } from 'react';
import dynamic from "next/dynamic";
import wordlistArr from '@/resources/wordlist';
import UserLetterSquare from './userlettersquare';
import relevantSort from '@/resources/relevant_sort';
import groupAnagrams from '@/resources/anagram_grouper';
import PossibleAnswer from './answergroup';
import HowToPopUp from './HowToPopUp';
import Header from './Header';
import Footer from './footer';

const SolvrIndex: React.FC = () => {

type LetterInfo = {letter: string;colour: string;};
type UserWordState = {[key: number]: LetterInfo;};

const [showHelpPopUp,setshowHelpPopUp] = useState<Boolean>(false);

const [answersToShow,setanswersToShow] = useState<number>(0);
const [errorMessage,setErrorMessage] = useState<string>('\u00A0');

const flashErrorMessage = (message: string) => {
    setErrorMessage(message);
    setTimeout(() => setErrorMessage('\u00A0'), 1500);
}




const [userWord, setUserWord] = useState<UserWordState>({
    0: { letter: 'a', colour: 'var(--Grey)' },
    1: { letter: 'r', colour: 'var(--Grey)' },
    2: { letter: 'o', colour: 'var(--Grey)' },
    3: { letter: 's', colour: 'var(--Grey)' },
    4: { letter: 'e', colour: 'var(--Grey)' },
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
    if (colour === 'var(--Green)') {
        newOptions[index] = [letter];
    };
    // If Letter is a match but not at that positon
        // remove from current index
    if (colour === 'var(--Yellow)') {
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
    if (colour === 'var(--Grey)') {
        for (let i = 0; i < 5; i++) {
        const indexToRemove = newOptions[i].indexOf(letter);
        if (indexToRemove > -1) {newOptions[i].splice(indexToRemove, 1);}
        };}
    return newOptions;
    });};


const ProcessUserWord =()=>{
const submittedWord:string =  [userWord[0].letter,userWord[1].letter, userWord[2].letter,userWord[3].letter, userWord[4].letter].join('')
if (sortedWords.includes(submittedWord ))
{    addToPreviousGuessList(userWord);
    for (let i = 0; i < 5; i++) {
        processLetter(i,userWord[i].letter,userWord[i].colour)
    };}
else {
    flashErrorMessage('Invalid Word')
}
};


    
const sortedWords = useMemo(() => {
    return relevantSort(remainingOptions);
  }, [remainingOptions]);
    
const groupedWords = useMemo(()=>{
    return groupAnagrams(sortedWords)
},[sortedWords])


    
const ShowMoreAnswers=(showExtra:number) => {
    if (answersToShow+showExtra < groupedWords.length){setanswersToShow(answersToShow+showExtra)}
    else {setanswersToShow(groupedWords.length)}
}

const setWordToAnswer=(newWord:string)=>{
    for (let i = 0; i < 5; i++) {
        ChangeUserLetter(i,'var(--Grey)',newWord[i])
    }

}

    
return (
    <div className='container'>
    {showHelpPopUp && <HowToPopUp setshowHelpPopUp={setshowHelpPopUp} />}
    
    <Header setshowHelpPopUp={setshowHelpPopUp}/>

    <div id="ErrorMessage" className={`ErrorMessage ${errorMessage != '\u00A0'? 'shake' : ''}`}>{errorMessage}</div>

    
    <div className='LetterContainer'>
        <UserLetterSquare letter={userWord[0].letter} index={0} ChangeUserLetter={ChangeUserLetter} colour={userWord[0].colour} />
        <UserLetterSquare letter={userWord[1].letter} index={1} ChangeUserLetter={ChangeUserLetter} colour={userWord[1].colour} />
        <UserLetterSquare letter={userWord[2].letter} index={2} ChangeUserLetter={ChangeUserLetter} colour={userWord[2].colour} />
        <UserLetterSquare letter={userWord[3].letter} index={3} ChangeUserLetter={ChangeUserLetter} colour={userWord[3].colour} />
        <UserLetterSquare letter={userWord[4].letter} index={4} ChangeUserLetter={ChangeUserLetter} colour={userWord[4].colour} />
    </div>


    <br/>
    <button className='button-Green' onClick={()=>ProcessUserWord()}>submit word</button>
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



{groupedWords[0].length !== 1? 'Top Suggestions':'Top Suggestion'}
<PossibleAnswer wordlist={groupedWords[0]} listmode={false} setWordToAnswer={setWordToAnswer}/>

<br/>
There are currently <b>{sortedWords.length}</b> remaining options<br/>

{groupedWords.slice(1,answersToShow).map((group, index) => (
        <PossibleAnswer key={index} wordlist={group} listmode={true} setWordToAnswer={setWordToAnswer}/>
    ))}
<br/>
<button className='button-Green' onClick={()=>ShowMoreAnswers(10)}>Show Next Ten</button>
<br/>
<button className='button-Green'onClick={()=>flashErrorMessage('ERROR')}>Try Error</button>
<br/>


<Footer/>
    </div>
    );


};


export default dynamic (() => Promise.resolve(SolvrIndex), {ssr: false})

