import React from "react";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";

/* This component is used to display the wrong letters added by the user
and display the "lives" left using a count and balloon Unicode symbol. */

const WrongLetters = ({ gamePlayable, buttonAvailable }) => {
  const wrongLetters = useSelector((state) => state.word.lose);
  const [countDown, setCountDown] = useState(8);

  let count = 8 - wrongLetters.length;

  /*If the wrong letters array length is not equal to 0, 
  the count down is set to count, which will decrease from 8 by one, 
  every time a new incorrect letter is used.*/

  useEffect(() => {
    if (!wrongLetters.length == 0) {
      setCountDown(count);
    }
  }, [count]);

  /*A map method to list the wrong letters, which is used for display.*/

  const displayWrongLetters = wrongLetters.map((letter) => {
    return <li key={letter}> {letter} </li>;
  });

  /* The return includes the wrong letter display and the countdown - the countdown will
  only show if the user is playing the game.  */

  return (
    <>
      <div className="wrong-letters">
        <h4>Wrong Letters</h4>
        <div className="wrongLetters-box">
          <ul className="wrongLetters">{displayWrongLetters}</ul>
        </div>
      </div>
      <div className="countdown-box">
        {gamePlayable && !buttonAvailable ? (
          <p className="countdown">{countDown} &#127880; remaining</p>
        ) : (
          <></>
        )}
      </div>
    </>
  );
};

export default WrongLetters;


