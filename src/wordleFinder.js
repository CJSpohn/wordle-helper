import wordList from "./wordList";

const wordleFinder = (
  excludedLetters,
  includedLetters,
  truePositions,
  falsePositions
) => {
  const possibilitiesAfterExclusion = excludedLetters.reduce((list, letter) => {
    const possibleWords = list.filter((word) => !word.includes(letter));
    return possibleWords;
  }, wordList);

  const possibilitiesAfterInclusion = includedLetters.reduce((list, letter) => {
    const possibleWords = list.filter((word) => word.includes(letter));
    return possibleWords;
  }, possibilitiesAfterExclusion);
  // { 0: 'p', 1: '', 2: '', 3: 's', 4: ''}
  const possibilitesAfterFirstLetter = truePositions[0]
    ? possibilitiesAfterInclusion.filter((word) => word[0] === truePositions[0])
    : possibilitiesAfterInclusion;

  const possibilitesAfterSecondLetter = truePositions[1]
    ? possibilitesAfterFirstLetter.filter(
        (word) => word[1] === truePositions[1]
      )
    : possibilitesAfterFirstLetter;

  const possibilitesAfterThirdLetter = truePositions[2]
    ? possibilitesAfterSecondLetter.filter(
        (word) => word[2] === truePositions[2]
      )
    : possibilitesAfterSecondLetter;

  const possibilitesAfterFourthLetter = truePositions[3]
    ? possibilitesAfterThirdLetter.filter(
        (word) => word[3] === truePositions[3]
      )
    : possibilitesAfterThirdLetter;

  const possibilitesAfterFifthLetter = truePositions[4]
    ? possibilitesAfterFourthLetter.filter(
        (word) => word[4] === truePositions[4]
      )
    : possibilitesAfterFourthLetter;
  // ["trust", "truce", "hotel"] {0: ["t", "l"], 1: ["e"]}
  const removedFalsePositions0 =
    falsePositions[0].length > 0
      ? possibilitesAfterFifthLetter.filter(
          (word) => !falsePositions[0].some((letter) => letter === word[0])
        )
      : possibilitesAfterFifthLetter;

  const removedFalsePositions1 =
    falsePositions[1].length > 0
      ? removedFalsePositions0.filter(
          (word) => !falsePositions[1].some((letter) => letter === word[1])
        )
      : removedFalsePositions0;

  const removedFalsePositions2 =
    falsePositions[2].length > 0
      ? removedFalsePositions1.filter(
          (word) => !falsePositions[2].some((letter) => letter === word[2])
        )
      : removedFalsePositions1;

  const removedFalsePositions3 =
    falsePositions[3].length > 0
      ? removedFalsePositions2.filter(
          (word) => !falsePositions[3].some((letter) => letter === word[3])
        )
      : removedFalsePositions2;

  const removedFalsePositions4 =
    falsePositions[4].length > 0
      ? removedFalsePositions3.filter(
          (word) => !falsePositions[4].some((letter) => letter === word[4])
        )
      : removedFalsePositions3;

  return removedFalsePositions4;
};

export default wordleFinder;
