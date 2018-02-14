var inquirer = require('inquirer');
var Word = require("./word.js");
var Game = require("./game.js");

console.log("War Movies Hangman!");
console.log("Good Luck!");
console.log("-----------------------------");

prompt.start();

var game = {
    wordList: Game.wordList,
    wordsCorrect: 0,
    guessesLeft: 10,
    guessedLetters: [], 
}

