import "./Header.scss";
export const Header = () => {
  return (
    <header className="header">
      <h1>Wordle Helper!</h1>
      <p>
        Enter your guesses as you go. Make sure to track the colors you receive.
      </p>
    </header>
  );
};

export default Header;
