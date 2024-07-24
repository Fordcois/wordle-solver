const relevantSort = (wordlist:string[]) => {
    // Create a map to count letter frequencies
    let letterCountMap = new Map();
  
    // Count the frequency of each unique letter across all words
    wordlist.forEach(word => {
      new Set(word).forEach(letter => {
        letterCountMap.set(letter, (letterCountMap.get(letter) || 0) + 1);
      });
    });
  
    // Convert the map to an array and sort it by frequency in descending order
    let sortedLetterCounts = Array.from(letterCountMap.entries()).sort((a, b) => b[1] - a[1]);
  
    // Assign ranks, considering ties
    let rankedLetterCounts = [];
    let currentRank = 1;
  
    for (let i = 0; i < sortedLetterCounts.length; i++) {
      if (i > 0 && sortedLetterCounts[i][1] !== sortedLetterCounts[i - 1][1]) {
        currentRank = i + 1;
      }
      rankedLetterCounts.push([sortedLetterCounts[i][0], sortedLetterCounts[i][1], currentRank]);
    }
  
    const scoreWord = (word:string) => {
      let score = 0;
      new Set(word).forEach(letter => {
        let index = rankedLetterCounts.findIndex(([itemLetter]) => itemLetter === letter);
        if (index !== -1) {
          score += rankedLetterCounts[index][2];
        }
      });
      return score;
    }
  
    // Sort the wordlist by the number of unique letters (descending order)
    wordlist.sort((a, b) => {
      let uniqueLettersA = new Set(a).size;
      let uniqueLettersB = new Set(b).size;
  
      if (uniqueLettersA !== uniqueLettersB) {
        return uniqueLettersB - uniqueLettersA; // Sort by number of unique letters in descending order
      }
  
      // If the number of unique letters is the same, sort by ScoreWord (ascending order)
      return scoreWord(a) - scoreWord(b); // Sort by score in ascending order
    });
  
    return wordlist;
  }
  
export default relevantSort;