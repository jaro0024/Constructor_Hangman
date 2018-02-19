// Requiring the Letter constructor function we exported from letter.js
var Letter = require("./letter.js");
// Constructor function for creating Word objects
function Word(word) {
    this.word = word;
    // this.ltrs will hold all of the letters for the Word object
    this.letters = [];
    this.wordFound = false;
    // Function to get all letters of newWord and push to the empty array
    this.getLtr = function() {
        for(var i = 0; i < this.word.length; i++) {
            var newLtr = new Letter(this.word[i]);
            this.letters.push(newLtr);
        }
    };
    // Function to check if the word is found
    this.findWord = function() {
        var count = 0;
        // Loop to check all letters of the array and increase count every time a letter appears
        for(var i = 0; i < this.letters.length; i++) {
            if(this.letters[i].appear) {
                count++;
            }
        }
        // When count is equal to the length of the array of letters, then the word is found, so this.found will change to true
        if(count === this.letters.length) {
            this.wordFound = true;
        }
        return this.wordFound;
    };
    // Function to check guessed letter
    this.checkLetter = function (guessedLetter) {
        var whatToReturn = 0;
        // Loop to check if the word letters in the array are equal to the guessedLetter
        for(var i = 0; i < this.letters.length; i++) {
            // If they match, the letter guessed will appear 
            if(this.letters[i].ltr.toUpperCase() === guessedLetter) {
                this.letters[i].appear = true;
                whatToReturn++;
            }
        }
        return whatToReturn;
    };
    // FUnction to render the words
    this.renderWord = function() {
        var display = '';
        // Loop to check the letters and to return the letters as a string (render the word)
        for(var i = 0; i < this.letters.length; i++) {
            display += this.letters[i].letterRender();
        }
        return display;
    };
};

module.exports = Word;