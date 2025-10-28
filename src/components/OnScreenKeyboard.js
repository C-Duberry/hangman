

 import React from "react";
const OnScreenKeyboard = ({
  handleGuess,
  correctLetters,
  incorrectLetters,
  disabled,
}) => {
  const keyboardRows = [
    "qwertyuiop".split(""),
    "asdfghjkl".split(""),
    "zxcvbnm".split(""),
  ];

  return (
    <div className="keyboard">
      {keyboardRows.map((row, rowIndex) => (
        <div key={rowIndex} className={`keyboard-row row-${rowIndex}`}>
          {row.map((letter) => {
            const used =
              correctLetters.includes(letter) ||
              incorrectLetters.includes(letter);

            return (
              <button
                key={letter}
                className={`key ${used ? "used" : ""}`}
                onClick={() => handleGuess(letter)}
                disabled={disabled || used}
              >
                {letter}
              </button>
            );
          })}
        </div>
      ))}
    </div>
  );
};

export default OnScreenKeyboard;