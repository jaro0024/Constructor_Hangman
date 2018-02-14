var Letter = require("./letter.js");

function Word(newWord) {
    this.newWord = newWord;
    this.ltrs = [];
    this.found = false;
    this.getLtrs = function() {
        for(var i = 0; i < this.newWord.length; i++) {
            this.ltrs.push(new Letter(this.newWord[i]));
        }
    }
};

module.exports = Word;