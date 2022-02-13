import "./LetterControl.scss";

const colorDict = {
  gray: "#3a3a3c",
  green: "#538d4e",
  yellow: "#c9b458",
};

export const LetterControl = ({ autoFocus, letterPosition, setWord, word }) => {
  const handleRadioChange = (e) => {
    setWord((prev) => ({
      ...prev,
      [letterPosition]: {
        ...prev[letterPosition],
        color: e.target.value,
      },
    }));
  };

  const handleKeyUp = (e) => {
    if (
      (e.keyCode >= 65 && e.keyCode <= 90) ||
      (e.keyCode >= 97 && e.keyCode <= 122)
    ) {
      if (e.target.dataset.position === "4") {
        const button = e.target.parentNode.parentNode.nextSibling;
        button.focus();
      } else {
        const nextLetterInput = e.target.parentNode.nextSibling?.firstChild;
        nextLetterInput?.nodeName === "INPUT" && nextLetterInput.focus();
      }
    } else if (e.key === "Backspace") {
      const prevLetterInput = e.target.parentNode.previousSibling?.firstChild;
      prevLetterInput?.nodeName === "INPUT" && prevLetterInput.focus();
    }
  };

  return (
    <div>
      <input
        maxLength="1"
        type="text"
        value={word[letterPosition].value}
        onChange={(e) =>
          setWord((prev) => ({
            ...prev,
            [letterPosition]: {
              ...prev[letterPosition],
              value: e.target.value,
            },
          }))
        }
        data-position={letterPosition}
        onKeyUp={(e, referenceRef) => handleKeyUp(e, referenceRef)}
        style={{ background: colorDict[word[letterPosition].color] }}
        autoFocus={autoFocus}
        autoComplete="off"
      ></input>
      <div className="radio-wrapper">
        <input
          type="radio"
          id="gray"
          name="first_letter"
          value="gray"
          data-number={0}
          checked={word[letterPosition].color === "gray"}
          onChange={(e) => handleRadioChange(e)}
          style={{ background: colorDict.gray }}
        ></input>
        <input
          type="radio"
          id="yellow"
          name="first_letter"
          value="yellow"
          data-number={1}
          checked={word[letterPosition].color === "yellow"}
          onChange={(e) => handleRadioChange(e)}
          style={{ background: colorDict.yellow }}
        ></input>
        <input
          type="radio"
          id="green"
          name="first_letter"
          value="green"
          data-number={2}
          checked={word[letterPosition].color === "green"}
          onChange={(e) => handleRadioChange(e)}
          style={{ background: colorDict.green }}
        ></input>
      </div>
    </div>
  );
};

export default LetterControl;
