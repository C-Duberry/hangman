/*This is the component for the help popup.*/

const Help = ({setGetHelp, setGamePlayable, setUserMessage, buttonAvailable}) => {
  /*The list of hangman rules are stored in an array */

  const hangManRules = [
    "To start a new game, click start game.",
    "The number of dashes is the length of the word you have to guess.",
    "For each right letter you guess correctly, the letter will be added to the word.",
    "For each incorrect letter you guess, the letter will go into the wrong letters box and the hangman will lose a balloon.",
    "When there are no balloons left, you lose the game.",
    "If you can guess the word before you run out of balloons, you win.",
    "You start with 8 balloons.",
  ];

  let userMessageAfterHelp = "Click to start game";

  /*The map method is used to map through the array and convert the rules into a list.  */

  const displayHangmanRules = hangManRules.map((item, index) => {
    return (
      <li key={index}>
        <span>{item}</span>
      </li>
    );
  });

  /*This function is called when the close help button is clicked. It is used to return the app to
  the state before the button was clicked. If the start button is available(meaning the game has not began), 
  the function will convert the resume message back to the start message, else it will be not display. */

  const closeHelp = () => {
    setGetHelp(false);
    setGamePlayable(true);
    if (buttonAvailable) {
      setUserMessage(userMessageAfterHelp);
    }
  };

  /* The return includes a paragraph on the main aim of the game, the hangman list and the close button with an
    onClick event for the closeHelp function. */

  return (
    <div className="help-box">
      <h4>Hangman Rules</h4>
      <p>
        Guess the correct word before you run out of chances. You have 8 chances
        to guess the correct word.
      </p>
      <ul className="hangmanRules-list">{displayHangmanRules}</ul>

      <button onClick={closeHelp} className="close-help">
        Close
      </button>
    </div>
  );
};

export default Help;
