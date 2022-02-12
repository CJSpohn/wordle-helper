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
    setPossibleWords(
      wordleFinder(
        excludedLetters,
        includedLetters,
        truePositions,
        falsePositions
      )
    );
  }, [includedLetters, excludedLetters, truePositions, falsePositions]);

  const determineWord = () => {
    for (const letterPosition in word) {
      switch (word[letterPosition].color) {
        case "gray":
          if (
            !excludedLetters.includes(word[letterPosition].value) &&
            word[letterPosition].value.length > 0
          ) {
            setExcludedLetters((prev) => [...prev, word[letterPosition].value]);
          }
          break;
        case "yellow":
          if (
            !includedLetters.includes(word[letterPosition].value) &&
            word[letterPosition].value.length > 0
          ) {
            setIncludedLetters((prev) => [...prev, word[letterPosition].value]);
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
          setTruePositions((prev) => ({
            ...prev,
            [letterPosition]: word[letterPosition].value,
          }));
          break;
        default:
          break;
      }
    }
    setWord(initialWordState);
  };

  return (
    <div className="main">
      <Header />
      <section className="word-input">
        <WordControl word={word} setWord={setWord} />
      </section>
      <button className="go-button" onClick={determineWord}>
        GO!
      </button>
      {!!possibleWords.length &&
        possibleWords.length !== 2315 &&
        possibleWords.length > 1 && (
          <p style={{ color: "white" }}>
            There are {possibleWords.length} words remaining. Try guessing{" "}
            {wordGuess}
          </p>
        )}
      {possibleWords.length === 1 && (
        <p style={{ color: "white" }}>
          HOLY SHIT YOUR WORD IS {possibleWords[0]}
        </p>
      )}
      {possibleWords.length === 0 && (
        <p style={{ color: "white" }}>
          There are no words left. You may have messed up. Refresh the page to
          start over.
        </p>
      )}
    </div>
  );
};

export default App;
