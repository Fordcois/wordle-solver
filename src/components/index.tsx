"use client";
import React, { useState, useMemo } from 'react';
import dynamic from "next/dynamic";
import wordlistArr from '@/resources/wordlist';
import relevantSort from '@/resources/relevant_sort';
import groupAnagrams from '@/resources/anagram_grouper';
import PossibleAnswer from './answergroup';
import HowToPopUp from './HowToPopUp';
import Header from './Header';
import Footer from './footer';
import LetterSquare from './LetterSquare';
import PrevGuessDisplay from './PreviousGuesses';
import RemainingOptions from './remainingoptions';

const SolvrIndex: React.FC = () => {

type LetterInfo = {letter: string;colour: string;};
type UserWordState = {[key: number]: LetterInfo;};
interface LetterList {[key: number]: string[];}

const [showHelpPopUp,setshowHelpPopUp] = useState<boolean>(false);
const [possibleWords,setpossibleWords] = useState<string[]>(wordlistArr);


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
    5: []
});


const processLetter = (index: number,letter: string,colour: string,letterList: LetterList): LetterList => {
    const newOptions: LetterList = { ...letterList };
     // If letter is match in position
        // remove all over letters from that indexlist
    if (colour === 'var(--Green)') {
      newOptions[index] = [letter];
    }
     // If Letter is a match but not at that positon
        // remove from current index
    if (colour === 'var(--Yellow)') {
      const indexToRemove = newOptions[index].indexOf(letter);
      if (indexToRemove > -1) {newOptions[index].splice(indexToRemove, 1);}
      // If not already in there add the letter to the Discovered Letters List
      if (!newOptions[5].includes(letter)){newOptions[5].push(letter)}
    }
    // if letter not in word
        // Remove from all options Lists if not already removed
    if (colour === 'var(--Grey)') {
      for (let i = 0; i < 5; i++) {
        const indexToRemove = newOptions[i].indexOf(letter);
        if (indexToRemove > -1) {newOptions[i].splice(indexToRemove, 1);}
      }
    }
    return newOptions;
  };

const ProcessWord = (NewUserWord: UserWordState, LetterList: LetterList): LetterList => {
    let NewLetterList = {...LetterList};
    for (let i = 0; i < 5; i++) 
        {NewLetterList = processLetter(i, NewUserWord[i].letter, NewUserWord[i].colour, NewLetterList);}
    return NewLetterList;
};

const BuildLetterLists = (userWord: UserWordState) => {
    let updatedLetterList = {...letterOptions};
    return ProcessWord(userWord, updatedLetterList);
}

const FilterOptions = (WordArray: string[], passedLetters: LetterList) => {
    return WordArray.filter(word =>
        passedLetters[0].includes(word[0]) &&
        passedLetters[1].includes(word[1]) &&
        passedLetters[2].includes(word[2]) &&
        passedLetters[3].includes(word[3]) &&
        passedLetters[4].includes(word[4]) &&
        passedLetters[5].every(letter => word.includes(letter))
    )
}

const WordSubmit = () => {
    const submittedWord = [userWord[0].letter,userWord[1].letter, userWord[2].letter,userWord[3].letter, userWord[4].letter].join('')

    if (!possibleWords.includes(submittedWord)) {
        flashErrorMessage('INVALID WORD');
        return;
    }
    const updatedLetterList = BuildLetterLists(userWord);
    const filteredList = FilterOptions(possibleWords, updatedLetterList);

    if (filteredList.length === 0) {
        flashErrorMessage('INVALID WORD');
    } else {
        setLetterOptions(updatedLetterList);
        setpossibleWords(filteredList);
        addToPreviousGuessList(userWord);
    }
}

const sortedWords = useMemo(() => {
    return relevantSort(possibleWords);}, 
    [possibleWords]);
    
const groupedWords = useMemo(()=>{
    return groupAnagrams(sortedWords)},
    [sortedWords])



const setWordToAnswer=(newWord:string)=>{
    for (let i = 0; i < 5; i++) {
        if (userWord[i].colour=='var(--Green)')
            {ChangeUserLetter(i,'var(--Green)',newWord[i])}
        else
            {ChangeUserLetter(i,'var(--Grey)',newWord[i])}
    }
}
    
return (
<div className='container'>
    {showHelpPopUp && <HowToPopUp setshowHelpPopUp={setshowHelpPopUp} />}

    <Header setshowHelpPopUp={setshowHelpPopUp}/>
    <div id="ErrorMessage" className="ErrorMessage">{errorMessage}</div>
    
    <div className={`LetterContainer ${errorMessage != '\u00A0'? 'shake' : ''}`}>
        <LetterSquare letter={userWord[0].letter} index={0} ChangeUserLetter={ChangeUserLetter} colour={userWord[0].colour}/>
        <LetterSquare letter={userWord[1].letter} index={1} ChangeUserLetter={ChangeUserLetter} colour={userWord[1].colour}/>
        <LetterSquare letter={userWord[2].letter} index={2} ChangeUserLetter={ChangeUserLetter} colour={userWord[2].colour}/>
        <LetterSquare letter={userWord[3].letter} index={3} ChangeUserLetter={ChangeUserLetter} colour={userWord[3].colour}/>
        <LetterSquare letter={userWord[4].letter} index={4} ChangeUserLetter={ChangeUserLetter} colour={userWord[4].colour}/>
    </div>

    <button className='button-Green' onClick={WordSubmit}>submit word</button>

    

    {groupedWords[0].length !== 1? 'Top Suggestions':'Top Suggestion'}
    <PossibleAnswer wordlist={groupedWords[0]} setWordToAnswer={setWordToAnswer}/>

    <span><b>{sortedWords.length}</b> remaining options</span>

    <PrevGuessDisplay previousGuesses={previousGuesses} />
    
    <RemainingOptions groupedWords={groupedWords} setWordToAnswer={setWordToAnswer}/>
 

    
    <button className='button-Green'onClick={()=>flashErrorMessage('ERROR')}>Try Error</button>
    <Footer/>
</div>
);};

export default dynamic (() => Promise.resolve(SolvrIndex), {ssr: false})