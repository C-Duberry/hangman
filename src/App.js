//Capstone Project: Hangman

/* This is a hangman app using react and Redux. The hangman image is 
not the traditional image but of a stickman holding on to balloons as it 
seemed more appropriate.

The way the app works is by fetching a random word from an API key, 
which is then stored using Redux. The losing letters and winning 
letters are also stored using Redux. 

There are various different components that make 
up this app. This includes:

GamePage - this is the base component page.
GameStatus - checks the status of the game.
Header - the header of the app.
Help - the help page.
ImageState - a component for the different images used.
Notification - a component for whether a letter is repeated.
WrongLetter - a component for what happens when an incorrect letter is played.   */

import "./App.css";
import GamePage from "./components/GamePage";

function App() {
  return (
      <>
        <GamePage />
      </>
  );
}

export default App;


/*References

Help from TechGuyWeb (2020) Build hangman with react, YouTube. YouTube. 
Available at: https://www.youtube.com/watch?v=jj0W8tYX_q8 (Accessed: February 12, 2023). */