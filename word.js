var Letter = require("./letter.js");

function Word(newWord) {
    this.newWord = newWord;
    this.characters = [];
};

module.exports = Word;