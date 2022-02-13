import { useState, useEffect } from "react";
import "./App.scss";
import wordleFinder from "./wordleFinder";
import WordControl from "./components/WordControl/WordControl";
import Header from "./Header/Header";

const initialWordState = {
  0: {
    value: "",
    color: "gray",
  },
  1: {
    value: "",
    color: "gray",
  },
  2: {
    value: "",
    color: "gray",
  },
  3: {
    value: "",
    color: "gray",
  },
  4: {
    value: "",
    color: "gray",
  },
};

const App = () => {
  const [excludedLetters, setExcludedLetters] = useState([]);
  const [includedLetters, setIncludedLetters] = useState([]);
  const [truePositions, setTruePositions] = useState({
    0: "",
    1: "",
    2: "",
    3: "",
    4: "",
  });
  const [falsePositions, setFalsePositions] = useState({
    0: [],
    1: [],
    2: [],
    3: [],
    4: [],
  });
  const [word, setWord] = useState(initialWordState);
  const [possibleWords, setPossibleWords] = useState([]);
  const [wordGuess, setWordGuess] = useState("");

  useEffect(() => {
    setWordGuess(
      possibleWords[Math.floor(Math.random() * possibleWords.length)]
    );
  }, [possibleWords]);

  useEffect(() => {
    const wordsLeft = wordleFinder(
      excludedLetters,
      includedLetters,
      truePositions,
      falsePositions
    );
    setPossibleWords(wordsLeft);
  }, [includedLetters, excludedLetters, truePositions, falsePositions]);

  const determineWord = () => {
    const currentExcludedLetters = [];
    const currentIncludedLetters = [];
    for (const letterPosition in word) {
      switch (word[letterPosition].color) {
        case "gray":
          if (
            //don't put it in the array twice
            !excludedLetters.includes(word[letterPosition].value) &&
            //don't exclude it if it's already in the word (double letter words)
            !includedLetters.includes(word[letterPosition].value) && // previous words
            !currentIncludedLetters.includes(word[letterPosition].value) // this word
          ) {
            currentExcludedLetters.push(word[letterPosition].value);
          }
          break;
        case "yellow":
          if (!includedLetters.includes(word[letterPosition].value)) {
            currentIncludedLetters.push(word[letterPosition].value);
          }
          setFalsePositions((prev) => ({
            ...prev,
            [letterPosition]: [
              ...prev[letterPosition],
              word[letterPosition].value,
            ],
          }));
          break;
        case "green":
          if (!currentIncludedLetters.includes(word[letterPosition].value)) {
            currentIncludedLetters.push(word[letterPosition].value);
          }
          setTruePositions((prev) => ({
            ...prev,
            [letterPosition]: word[letterPosition].value,
          }));
          break;
        default:
          break;
      }
    }
    //this ensures if one O was gray and one O was yellow we don't include O in the list of exclusions
    const allowedDuplicates = currentExcludedLetters.filter(
      (letter) => !currentIncludedLetters.includes(letter)
    );
    setExcludedLetters((prev) => [...prev, ...allowedDuplicates]);
    setIncludedLetters((prev) => [...prev, ...currentIncludedLetters]);
    setWord(initialWordState);
  };

  const handleNewWord = () => {
    setWordGuess(
      possibleWords[Math.floor(Math.random() * possibleWords.length)]
    );
  };

  const handleStartOver = () => {
    setWord(initialWordState);
    setExcludedLetters([]);
    setIncludedLetters([]);
    setTruePositions({
      0: "",
      1: "",
      2: "",
      3: "",
      4: "",
    });
    setFalsePositions({
      0: [],
      1: [],
      2: [],
      3: [],
      4: [],
    });
    setWordGuess("");
  };

  return (
    <div className="main">
      <Header />
      <section className="word-input">
        <WordControl word={word} setWord={setWord} />
      </section>
      <button
        className="go-button"
        onClick={determineWord}
        disabled={
          word[0].value.length !== 1 ||
          word[1].value.length !== 1 ||
          word[2].value.length !== 1 ||
          word[3].value.length !== 1 ||
          word[4].value.length !== 1
        }
      >
        GO!
      </button>
      {!!possibleWords.length &&
        possibleWords.length !== 2315 &&
        possibleWords.length >= 5 && (
          <>
            <div className="answer-wrapper">
              <p>
                There are {possibleWords.length} words remaining. Try guessing:
              </p>
              <br />
              <p className="word">{wordGuess}</p>
            </div>
            <button className="new-word-button" onClick={handleNewWord}>
              New Word?
            </button>
          </>
        )}
      {!!possibleWords.length &&
        possibleWords.length < 5 &&
        possibleWords.length > 1 && (
          <div className="answer-wrapper">
            <p>
              There are only {possibleWords.length} left! It's one of <br />
              <span className="word">{possibleWords.join(", ")}</span>
            </p>
          </div>
        )}
      {possibleWords.length === 1 && (
        <div className="answer-wrapper">
          <p>We found it! Your word is </p>
          <p className="word winning-word">{possibleWords[0]}</p>
        </div>
      )}
      {possibleWords.length === 0 && (
        <p>
          There are no words left. Either you messed up or we did :( Try
          starting over!
        </p>
      )}
      <button className="new-word-button" onClick={handleStartOver}>
        Start Over
      </button>
      <p>V 1.0.2</p>
      <p>{possibleWords.length}</p>
      <p>
        One: {word[0].value} Two: {word[1].value} Three: {word[2].value} Four:{" "}
        {word[3].value} Five: {word[4].value}
      </p>
    </div>
  );
};

export default App;
