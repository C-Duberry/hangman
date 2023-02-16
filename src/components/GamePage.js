/* This is the main component for the app.  It is essentially the 
foundation for the other components. Within this component, there are
multiple functions, useEffect hooks and useState hooks, which will be
explained below. */

import React from "react";
import { useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { losingLetters, newWord, winningLetters } from "../redux/wordSlice";
import WrongLetters from "./WrongLetters";
import { showNotification as show } from "../helpers/helpers";
import Notification from "./Notification";
import GameStatus from "./GameStatus";
import ImageState from "./ImageState";
import Help from "./Help";

const options = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": "ba62c869d5msh7c1738bdc6db44ep19aa3ajsnb4a6d73d5d81",
    "X-RapidAPI-Host": "random-word-by-api-ninjas.p.rapidapi.com",
  },
};

const GamePage = () => {
  const [gamePlayable, setGamePlayable] = useState(false);
  const [correctLetters, setCorrectLetters] = useState([]);
  const [incorrectLetters, setIncorrectLetters] = useState([]);
  const [showNotification, setShowNotification] = useState(false);
  const [gameWord, setGameWord] = useState("");
  const [startGame, setStartGame] = useState(false);
  const [buttonAvailable, setButtonAvailable] = useState(true);
  const [getHelp, setGetHelp] = useState(false);
  const [userMessage, setUserMessage] = useState("Click to start game");
  const dispatch = useDispatch();
  let resume = "Click close to resume";

  /* Functions */

  /*GameStart is called with the start game button. It first checks whether the button is 
available as the button is unavailable once the game has started. If the button is available,
The word from the API is stored using the Redux dispatch action. The game is set to playable, 
the startGame hook is set to true. These useState hooks are used for logic within the app.
The buttonAvailable is set to false, which removes the start button from the app. */

  const gameStart = () => {
    if (buttonAvailable) {
      dispatch(newWord(gameWord));
      setGamePlayable(true);
      setStartGame(true);
      setButtonAvailable(false);
    }
  };

  /* PlayAgain is called when the reset/play again button is clicked. It reloads the page
    for the user to play again.  */

  const playAgain = () => {
    window.location.reload(false);
  };

  /* helpPage is called with the help button. It sets get help to true, which is used as logic
    to show the help page. GamePlayable is set to false to prevent the user from being able to
    engage with the keypad whilst set to false. The user message is changed to the string in the resume
    variable. */

  const helpPage = () => {
    setGetHelp(true);
    setGamePlayable(false);
    setUserMessage(resume);
  };

  /*Use effects */

  /*Used to request a random word from an API. The returned word is saved using the setGameWord hook, the
  gameWord is used as an action payload for the dispatch, newWord.  */

  useEffect(() => {
    const getData = async () => {
      try {
        const request = await fetch(
          "https://random-word-by-api-ninjas.p.rapidapi.com/v1/randomword",
          options
        );
        const response = await request.json();
        const gameWord = response.word.toLowerCase();
        setGameWord(gameWord);
      } catch (error) {
        alert("Cannot handle request at this time.");
        console.log(error);
      }
    };
    getData();
  }, []);

  /*This use effect is used with a key event function. If the game is playable and the keys
    are letters, the letters are changed to lowercase. If the letter the user enters matched
    the gameWord, if it is not already in the correctLetters array, it is used as an action
    payload argument and stored in an array using Redux and stored within the other correct letters
    array.  The two arrays are used as it makes it easier when a word contains double letters.  The
    same is done for the incorrect letters. If the respective arrays already contain the letter the user
    enters, a notification is displayed to inform them that they have already used the letter. This use
    effect is triggered at the start of the game or when a correct/incorrect letter is entered.  */

  useEffect(() => {
    const handleKeydown = (event) => {
      const { key, keyCode } = event;
      if (gamePlayable && keyCode >= 65 && keyCode <= 90) {
        const letter = key.toLowerCase();
        if (gameWord.includes(letter)) {
          if (!correctLetters.includes(letter)) {
            dispatch(winningLetters(letter));
            setCorrectLetters((currentLetters) => [...currentLetters, letter]);
          } else {
            show(setShowNotification);
          }
        } else {
          if (!gameWord.includes(letter))
            if (!incorrectLetters.includes(letter)) {
              dispatch(losingLetters(letter));
              setIncorrectLetters((currentLetters) => [...currentLetters, letter,]);
            } else {
              show(setShowNotification);
            }
        }
      }
    };
    window.addEventListener("keydown", handleKeydown);
    return () => window.removeEventListener("keydown", handleKeydown);
  }, [gameStart, correctLetters, incorrectLetters, gamePlayable]);

  /*Within the return there is the image component, the help component, which is only shown 
if getHelp is set to true, The wrongLetters component and the buttons for reset and 
help. If the game has started and the help box is not open, the guess the word part
is shown using the map method, which returns the letters only if they are in the correctLetters 
array.  The return also includes the notification component and gameStatus component. The start
button is only shown if the game has not started. */

  return (
    <div>
      <div className="container">
        <div className="game-container">
          <ImageState wrongLetters={incorrectLetters} />
          <div className="wrong-reset">
            {getHelp ? (
              <Help
                setUserMessage={setUserMessage}
                userMessage={userMessage}
                buttonAvailable={buttonAvailable}
                setGetHelp={setGetHelp}
                setGamePlayable={setGamePlayable}
              />
            ) : (
              <>
                <WrongLetters
                  gamePlayable={gamePlayable}
                  wrongLetters={incorrectLetters}
                  buttonAvailable={buttonAvailable}
                />
                <div className="wrong-reset-buttons">
                  <button className="reset-btn" onClick={playAgain}>
                    Reset Game
                  </button>
                  <button onClick={helpPage} className="help-btn">
                    Help
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
        {startGame && !getHelp ? (
          <div className="word">
            {gameWord.split("").map((letter, index) => {
              return (
                <span className="game-letters" key={index}>
                  {correctLetters.includes(letter) ? letter : ""}
                </span>
              );
            })}
            <Notification
              showNotification={showNotification}
              gamePlayable={gamePlayable}
            />
          </div>
        ) : (
          <h4 className={gamePlayable ? "user-message" : ""}>{userMessage}</h4>
        )}
        {buttonAvailable ? (
          <button className="start" onClick={gameStart}>
            Start Game
          </button>
        ) : (
          <></>
        )}
      </div>
      <GameStatus setGamePlayable={setGamePlayable} playAgain={playAgain} />
    </div>
  );
};

export default GamePage;
