import { LetterControl } from "../LetterControl/LetterControl";

export const WordControl = ({ word, setWord }) => {
  return (
    <>
      <LetterControl
        word={word}
        setWord={setWord}
        autoFocus
        letterPosition={0}
      />
      <LetterControl word={word} setWord={setWord} letterPosition={1} />
      <LetterControl word={word} setWord={setWord} letterPosition={2} />
      <LetterControl word={word} setWord={setWord} letterPosition={3} />
      <LetterControl word={word} setWord={setWord} letterPosition={4} />
    </>
  );
};

export default WordControl;
