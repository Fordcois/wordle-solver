const groupAnagrams = (wordlist: string[]) => {
    let currentGroup: string[] = []
    let SortedGroups: string[][] = []
    
    const sortWord = (word: string) => word.split('').sort().join('');
    
    for (let i = 0; i < wordlist.length; i++) {
        let currentWord = wordlist[i]
        // Code to be executed for each iteration
        
        // if Current Group is Empty
            //Put Current word in that Group
        if (currentGroup.length == 0) {currentGroup.push(currentWord)}
        // if Current Group isn't Empty
        else {
            // Check if Anagram
            const isAnagram = sortWord(currentWord) === sortWord(currentGroup[0])
            // If it is an Anagram
            if (isAnagram) {
                // Add in into the Current Group
                currentGroup.push(currentWord)
            }
            else {
                //If not Anagram, push old Group and set current group to word
                SortedGroups.push(currentGroup)
                currentGroup = [currentWord]
            }
        }
    }
    
    // Add the last group to SortedGroups
    if (currentGroup.length > 0) {
        SortedGroups.push(currentGroup)
    }
    
    return SortedGroups
}

    export default groupAnagrams;