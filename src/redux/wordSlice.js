import { createSlice } from "@reduxjs/toolkit";

/*The initial state stores an empty array for the word, the winning letters and
the losing letters.  */

export const wordSlice = createSlice({
  name: "word",

  initialState: {
    word: [],
    win: [],
    lose: [],
  },

  reducers: {
    
    /*Used to get the word requested from the API, which is 
  then pushed into the empty word array.*/

    newWord: (state, action) => {
      const word = action.payload;
      state.word.push(word);
    },

    /*Checks if the user's letters are equal to the letters in the word, 
   if they are equal, the letter is pushed into the empty win array. */

    winningLetters: (state, action) => {
      let index = state.word[0];

      for (let letters of index) {
        if (action.payload === letters) {
          state.win.push(letters);
        }
      }
    },

    /*Pushes the incorrect letters as an action payload into 
    the lose array. */

    losingLetters: (state, action) => {
      let index = state.lose;
      index.push(action.payload);
    },
  },
});

export const { newWord, winningLetters, losingLetters } = wordSlice.actions;

export default wordSlice.reducer;
