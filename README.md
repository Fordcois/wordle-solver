# Wordle Solver

## Overview

This Wordle Solver is a tool designed to assist in solving [Wordle](https://www.nytimes.com/games/wordle/index.html) puzzles. It helps by analyzing your guesses and providing potential solutions based on the feedback received from the game - built with a mobile first minimalist aesthetic based on the Wordle website.

Solvr plays Wordle on Hard Mode -  where Any revealed hints must be used in subsequent guesses.

From my own experimentation this seems to solve the puzzle in around 3.5 guesses on average.

## How It Works

**Input**: Enter the results of your Wordle guesses, including the color feedback for each letter.
   
**Processing**: The tool maintains separate arrays for each position in the possible Wordle answer, as well as a separate array for confirmed letters. The letter index arrays are initialised with the alphabet (a-z), while the confirmed letter array begins empty.

The programme then iterates through the user's input, taking the index, letter, and colour into consideration:

- **Gray Letters**: Letters marked as grey (not in the word) are removed from all position-specific arrays.
- **Yellow Letters**: Letters marked as yellow (in the word but not in the correct position) are removed from their current position-specific array and added to a separate list of confirmed letters. This list ensures that the letter must appear somewhere in the word but not in its current position.
- **Green Letters**: Letters marked as green (correct position) are set as the only option for their respective position-specific arrays, making them fixed for that position.

**Filtering**: The tool filters the list of potential words by ensuring that each word matches the remaining valid options for each position and contains all confirmed letters in the correct spots.

**Guessing**: The tool uses the filtered list of possible words to make the next guess. It first counts the most common letters in the remaining words and prioritizes those with higher frequency letters, such as 'E', over those with less common letters, like 'Z'. The words are then grouped into sets of anagrams to avoid redundancy in suggestions. For example, 'Arose', 'Aeros', and 'Soare' would be grouped together, as they provide the same information about the letters. This grouping allows the UI to display a wider variety of suggestions for the user to choose from.

## Tech Stack
Solvr is built using the following technologies:

**Next.js:** A React framework for server-side rendering and building static websites.
**TypeScript:** A superset of JavaScript that adds static types, enhancing code quality and maintainability. TypeScript is used due to the large dataset handled by Solvr, ensuring a consistent approach to type safety as data is processed and passed through components and functions.

Solvr is hosted using Vercel, which offers seamless integration with Next.js. Vercel provides easy to use speed insights and analytics, helping to optimise performance and ensure a smooth user experience.

## Installation

1. Clone the Repository
```bash
git clone https://github.com/Fordcois/wordle-solver.git
```

2. Install Dependencies
```bash
npm install
```

3. Start the Development Server
```bash
npm run dev
```

4. Open http://localhost:3000 in your browser to see the application in action.

## Future Discussion Points

**Word List Optimization:** The theory behind the filtering is sound and, based on numbers, offers the best guess available. However, there is a certain 'human' element that is missing. There are certain words within the list that, while valid, are very obscure. The chances of these words being selected by a game's editor as the answer for the day are limited.

I'm reluctant to manually remove these 'unlikely' words from the dataset as I feel this diminishes the point of the tool. Additionally, for early guesses, these obscure words can actually provide more accuracy when moving into later guesses.

## Credits

The word list used includes the full set of 12,972 words recognized by the official Wordle game. It was sourced from [Kinkelin's Wordle Competition repository](https://github.com/Kinkelin/WordleCompetition/tree/main/data/official) and converted to an array using the online tool [ArrayThis](https://arraythis.com/)