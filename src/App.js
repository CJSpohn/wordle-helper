import logo from "./logo.svg";
import "./App.css";
import wordList from "./wordList";
import "./App.css";

function App() {
  const wordleFinder = (excludedLetters, includedLetters, positionLetters) => {
    const possibilitiesAfterExclusion = excludedLetters.reduce(
      (list, letter) => {
        const possibleWords = list.filter((word) => !word.includes(letter));
        return possibleWords;
      },
      wordList
    );

    const possibilitiesAfterInclusion = includedLetters.reduce(
      (list, letter) => {
        console.log(list);
        const possibleWords = list.filter((word) => word.includes(letter));
        return possibleWords;
      },
      possibilitiesAfterExclusion
    );
    console.log(possibilitiesAfterInclusion);
    // { 0: 'p', 1: '', 2: '', 3: 's', 4: ''}
    const possibilitesAfterFirstLetter = positionLetters[0]
      ? possibilitiesAfterInclusion.filter(
          (word) => word[0] === positionLetters[0]
        )
      : possibilitiesAfterInclusion;

    const possibilitesAfterSecondLetter = positionLetters[1]
      ? possibilitesAfterFirstLetter.filter(
          (word) => word[1] === positionLetters[1]
        )
      : possibilitesAfterFirstLetter;

    const possibilitesAfterThirdLetter = positionLetters[2]
      ? possibilitesAfterSecondLetter.filter(
          (word) => word[2] === positionLetters[2]
        )
      : possibilitesAfterSecondLetter;

    const possibilitesAfterFourthLetter = positionLetters[3]
      ? possibilitesAfterThirdLetter.filter(
          (word) => word[3] === positionLetters[3]
        )
      : possibilitesAfterThirdLetter;

    const possibilitesAfterFifthLetter = positionLetters[4]
      ? possibilitesAfterFourthLetter.filter(
          (word) => word[4] === positionLetters[4]
        )
      : possibilitesAfterFourthLetter;

    return possibilitesAfterFifthLetter;
  };

  //excluded, included, position
  console.log(
    wordleFinder(["t", "r", "a", "c", "m", "u", "b"], ["o"], {
      0: "",
      1: "",
      2: "",
      3: "s",
      4: "e",
    })
  );

  return (
    <form class="inputs">
      <div class="letter">
        <input
          class="letter__input"
          type="text"
          autocomplete="off"
          id="one"
          maxlength="1"
          tabindex="1"
        />
        <fieldset class="letter__buttons">
          <input
            class="letter__radio"
            type="radio"
            name="one"
            value="black"
            tabindex="6"
            checked
          />
          <input
            class="letter__radio"
            type="radio"
            name="one"
            value="yellow"
            tabindex="7"
          />
          <input
            class="letter__radio"
            type="radio"
            name="one"
            value="green"
            tabindex="8"
          />
        </fieldset>
      </div>
      <div class="letter">
        <input
          class="letter__input"
          type="text"
          autocomplete="off"
          id="two"
          maxlength="1"
          tabindex="2"
        />
        <fieldset class="letter__buttons">
          <input
            class="letter__radio"
            type="radio"
            name="two"
            value="black"
            tabindex="9"
            checked
          />
          <input
            class="letter__radio"
            type="radio"
            name="two"
            value="yellow"
            tabindex="10"
          />
          <input
            class="letter__radio"
            type="radio"
            name="two"
            value="green"
            tabindex="11"
          />
        </fieldset>
      </div>
      <div class="letter">
        <input
          class="letter__input"
          type="text"
          autocomplete="off"
          id="three"
          maxlength="1"
          tabindex="3"
        />
        <fieldset class="letter__buttons">
          <input
            class="letter__radio"
            type="radio"
            name="three"
            value="black"
            tabindex="12"
            checked
          />
          <input
            class="letter__radio"
            type="radio"
            name="three"
            value="yellow"
            tabindex="13"
          />
          <input
            class="letter__radio"
            type="radio"
            name="three"
            value="green"
            tabindex="14"
          />
        </fieldset>
      </div>
      <div class="letter">
        <input
          class="letter__input"
          type="text"
          autocomplete="off"
          id="four"
          maxlength="1"
          tabindex="4"
        />
        <fieldset class="letter__buttons">
          <input
            class="letter__radio"
            type="radio"
            name="four"
            value="black"
            tabindex="15"
            checked
          />
          <input
            class="letter__radio"
            type="radio"
            name="four"
            value="yellow"
            tabindex="16"
          />
          <input
            class="letter__radio"
            type="radio"
            name="four"
            value="green"
            tabindex="17"
          />
        </fieldset>
      </div>
      <div class="letter">
        <input
          class="letter__input"
          type="text"
          autocomplete="off"
          id="five"
          maxlength="1"
          tabindex="5"
        />
        <fieldset class="letter__buttons">
          <input
            class="letter__radio"
            type="radio"
            name="five"
            value="black"
            tabindex="18"
            checked
          />
          <input
            class="letter__radio"
            type="radio"
            name="five"
            value="yellow"
            tabindex="19"
          />
          <input
            class="letter__radio"
            type="radio"
            name="five"
            value="green"
            tabindex="20"
          />
        </fieldset>
      </div>
      <input
        class="submit"
        type="submit"
        value="Find Solutions"
        tabindex="21"
        disabled
      />
    </form>
  );
}

export default App;
