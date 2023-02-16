import React from "react";
import state1 from "../images/state1.GIF";
import state2 from "../images/state2.GIF";
import state3 from "../images/state3.GIF";
import state4 from "../images/state4.GIF";
import state5 from "../images/state5.GIF";
import state6 from "../images/state6.GIF";
import state7 from "../images/state7.GIF";
import state8 from "../images/state8.GIF";
import state9 from "../images/state9.GIF";
import { useSelector } from "react-redux";

/*Rather than doing hangman I have used the same principle but with chosen a stickman hanging on to balloons. 
As each incorrect letter is guessed, the stick man loses a balloon, until there are not any balloons left - 
which is the end of the game. 

The different image states are chosen depending on the length of the wrong letters array, which is stored in the
wrongGos variable. The logic is accomplished using a switch statement, which returns an image depending on the 
length of the array.  */

const ImageState = () => {
  const wrongLetters = useSelector((state) => state.word.lose);
  const wrongGos = wrongLetters.length;
  let image = "";

  switch (true) {
    case wrongGos === 0:
      image = state1;
      break;
    case wrongGos === 1:
      image = state2;
      break;
    case wrongGos === 2:
      image = state3;
      break;
    case wrongGos === 3:
      image = state4;
      break;
    case wrongGos === 4:
      image = state5;
      break;
    case wrongGos === 5:
      image = state6;
      break;
    case wrongGos === 6:
      image = state7;
      break;
    case wrongGos === 7:
      image = state8;
      break;
    case wrongGos >= 8:
      image = state9;
      break;
  }

  return (
    <div className="image-container">
      <img src={image} alt="hangman" />
    </div>
  );
};

export default ImageState;
