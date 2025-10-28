import React from "react";
import state1 from "../images/WebP/state1.webp";
import state2 from  "../images/WebP/state2.webp";
import state3 from  "../images/WebP/state3.webp";
import state4 from  "../images/WebP/state4.webp";
import state5 from  "../images/WebP/state5.webp";
import state6 from  "../images/WebP/state6.webp";
import state7 from  "../images/WebP/state7.webp";
import state8 from  "../images/WebP/state8.webp";
import state9 from  "../images/WebP/state9.webp";
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
