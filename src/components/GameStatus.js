import { useSelector } from "react-redux";
import { useEffect } from "react";

/* This component is used to check the status of the game and whether the 
user has won or lost. The component receives the playAgain and setGamePlayable 
as props from the gamePage. */

const GameStatus = ({ setGamePlayable, playAgain }) => {
  const wrongLetters = useSelector((state) => state.word.lose);
  const rightLetters = useSelector((state) => state.word.win);
  const word = useSelector((state) => state.word.word[0]);

  /*Empty variables change depending on win/lose status. */

  let finalMessage = "";
  let revealWord = "";
  let playable = "";

  /*This if statement first checks whether there is a word available. 

The  winning logic is dependent on whether the wrong letters array length is not equal to 
the losing number of tries, which is 8. If it is not, it checks whether the length of the right letter
array is equal to the word, if it is, then the user has one the game. 

The losing logic is based on whether the wrong letters array length is equal to 8. 

The message displayed to the user is based on whether they win or lose. For both status' playable is 
set to false, which is used to set the game to unplayable. */

  if (word) {
    if (wrongLetters && wrongLetters.length !== 8) {
      if (rightLetters) {
        if (rightLetters.length === word.length) {
          finalMessage = `You Win! Congratulations on guessing`;
          revealWord = `'${word}'`;
          playable = false;
        }
      }
    } else {
      if (wrongLetters.length === 8) {
        finalMessage = "Game Over. You lose!";
        revealWord = `The word was '${word}'`;
        playable = false;
      }
    }
  }

  /*Used to change the game to playable(false) when the final 
message variable is updated.*/

  useEffect(() => {
    setGamePlayable(playable);
  }, [finalMessage]);

  /*The component returns the popup message if the finalMessage variable is not empty. 
The popup message contains the win/lose statement, the word and a button to play again. */

  return (
    <div
      className="popup-container"
      style={finalMessage !== "" ? { display: "flex" } : {}}>
      <div className="popup">
        <h2>{finalMessage}</h2>
        <h2>{revealWord}</h2>
        <button onClick={playAgain}>Play again</button>
      </div>
    </div>
  );
};
export default GameStatus;
