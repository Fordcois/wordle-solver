# Wordle Solver

## Overview

This Wordle Solver is a tool designed to assist in solving [Wordle](https://www.nytimes.com/games/wordle/index.html) puzzles. It helps by analyzing your guesses and providing potential solutions based on the feedback received from the game.

## How It Works

**Input**: Enter the results of your Wordle guesses, including the color feedback for each letter.
   
**Processing**: The tool maintains separate arrays for each position in the possible Wordle answer, as well as a separate array for confirmed letters. The letter index arrays are initialised with the alphabet (a-z), while the confirmed letter array begins empty.

The programme then iterates through the user's input, taking the index, letter, and colour into consideration:

- **Gray Letters**: Letters marked as grey (not in the word) are removed from all position-specific arrays.
- **Yellow Letters**: Letters marked as yellow (in the word but not in the correct position) are removed from their current position-specific array and added to a separate list of confirmed letters. This list ensures that the letter must appear somewhere in the word but not in its current position.
- **Green Letters**: Letters marked as green (correct position) are set as the only option for their respective position-specific arrays, making them fixed for that position.


**Filtering**: The tool filters the list of potential words by ensuring that each word matches the remaining valid options for each position and contains all confirmed letters in the correct spots.

**Guessing**: Use the list of filtered possible words to make your next guess, and continue to refine the list based on subsequent feedback.

## Installation

To run the development server, use one of the following commands:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Then, open http://localhost:3000 in your browser to see the tool in action.

## Future Development

**Styling:** Improve the user interface with better styling. While the tool functions correctly, a more polished appearance is desired.

**Guess Tracking:** Implement functionality to track the number of attempts and notify the user if they have exceeded the maximum allowed guesses.

**Input Validation:** Enhance input validation to prevent errors, such as accepting green letters that were previously marked as gray.

**Word List Optimization:** Organize the word list by letter frequency and the number of unique letters. Currently, the front-end sorts by unique letters, but pre-sorting the dataset could optimize filtering.

## Credits

The word list used includes the full set of 12,972 words recognized by the official Wordle game. It was sourced from [Kinkelin's Wordle Competition repository](https://github.com/Kinkelin/WordleCompetition/tree/main/data/official) and converted to an array using the online tool [ArrayThis](https://arraythis.com/)