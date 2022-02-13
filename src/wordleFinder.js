import wordList from "./wordList";

const wordleFinder = (
  excludedLetters,
  includedLetters,
  truePositions,
  falsePositions
) => {
  //remove all words with letters that were shown gray
  const possibilitiesAfterExclusion = excludedLetters.reduce((list, letter) => {
    const possibleWords = list.filter((word) => !word.includes(letter));
    return possibleWords;
  }, wordList);

  //remove all words that do not contain letters that were shown yellow
  const possibilitiesAfterInclusion = includedLetters.reduce((list, letter) => {
    const possibleWords = list.filter((word) => word.includes(letter));
    return possibleWords;
  }, possibilitiesAfterExclusion);

  //remove all words that do not have letters in their known positions (shown green)
  const possibilitiesAfterTruePositions = [0, 1, 2, 3, 4].reduce(
    (wordsLeft, word, index) => {
      return truePositions[index]
        ? wordsLeft.filter((word) => word[index] === truePositions[index])
        : wordsLeft;
    },
    possibilitiesAfterInclusion
  );

  //remove all words that have letters where they cannot be (were previously yellow in that slot)
  const possibilitiesAfterFalsePositions = [0, 1, 2, 3, 4].reduce(
    (wordsLeft, word, index) => {
      return falsePositions[index]?.length > 0
        ? wordsLeft.filter(
            (word) =>
              !falsePositions[index].some((letter) => letter === word[index])
          )
        : wordsLeft;
    },
    possibilitiesAfterTruePositions
  );

  // example for totaling most common letters of every word still in play
  // const wordsAfterTrace = wordList.filter((word) => {
  //   return (
  //     !word.includes("t") &&
  //     !word.includes("r") &&
  //     !word.includes("a") &&
  //     !word.includes("c") &&
  //     !word.includes("e")
  //   );
  // });

  // const letters = wordsAfterTrace.reduce((a, c) => {
  //   if (!a[c[0]]) {
  //     a[c[0]] = 1;
  //   } else {
  //     a[c[0]]++;
  //   }
  //   if (!a[c[0]]) {
  //     a[c[0]] = 1;
  //   } else {
  //     a[c[0]]++;
  //   }
  //   if (!a[c[0]]) {
  //     a[c[0]] = 1;
  //   } else {
  //     a[c[0]]++;
  //   }
  //   if (!a[c[0]]) {
  //     a[c[0]] = 1;
  //   } else {
  //     a[c[0]]++;
  //   }
  //   if (!a[c[0]]) {
  //     a[c[0]] = 1;
  //   } else {
  //     a[c[0]]++;
  //   }
  //   return a;
  // }, {});

  return possibilitiesAfterFalsePositions;
};

export default wordleFinder;
