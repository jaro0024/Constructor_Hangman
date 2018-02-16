//Require necessary npm package
var inquirer = require('inquirer');
var isLetter = require('is-letter');
//Require objects/exports
var Word = require("./word.js");

// Creating an object for Hangman
var hangman = {
    wordList: ['Dunkirk', 'Saving Private Ryan', 'Fury', 'The Thin Red Line', 'Platoon', 'Black Hawk Down', 'The Hurt Locker'],
    guessesLeft: 7,
    guessedLetters: [],
    display: 0,
    currentWord: null,

    startGame: function () {
        var that = this;
        if (this.guessedLetters.length > 0) {
            this.guessedLetters = [];
        }

        inquirer.prompt([{
            name: "play",
            type: "confirm",
            message: "Ready to play?"
        }]).then(function (answer) {
            if (answer.play) {
                that.newGame();
            } else {
                console.log("Okay, lets play next time!");
            }
        })
    },
    newGame: function () {
        if (this.guessesLeft === 7) {
            console.log("READY SET GO!");
            var randNum = Math.floor(Math.random() * this.wordList.length);
            this.currentWord = new Word(this.wordList[randNum]);
            this.currentWord.getLtr();
            console.log(this.currentWord.renderWord());
            this.keepPromptingUser();
        } else {
            this.resetGuessesLeft();
            this.newGame();
        }
    },
    resetGuessesLeft: function () {
        this.guessesLeft = 7;
    },
    keepPromptingUser: function () {
        var that = this;
        inquirer.prompt([{
            name: "chosenLtr",
            type: "input",
            message: "Choose a letter:",
            validate: function (value) {
                if (isLetter(value)) {
                    return true;
                } else {
                    return false;
                }
            }
        }]).then(function (ltr) {
            var letterReturned = (ltr.chosenLtr).toUpperCase();
            var guessedAlready = false;
            for (var i = 0; i < that.guessedLetters.length; i++) {
                if (letterReturned === that.guessedLetters[i]) {
                    guessedAlready = true;
                }
            }
            if (guessedAlready === false) {
                that.guessedLetters.push(letterReturned);

                var found = that.currentWord.checkLetter(letterReturned);

                if (found === 0) {
                    console.log('Wrong, Guess again!');
                    that.guessesLeft--;
                    that.display++;
                    console.log('Guesses remaining: ' + that.guessesLeft);
                    console.log(that.currentWord.renderWord());
                    console.log("Letters guessed: " + that.guessedLetters);
                } else {
                    console.log('Yes! Keep Going!');
                    if (that.currentWord.findWord() === true) {
                        console.log(that.currentWord.renderWord());
                        console.log('Congratulations! You won the game!!!');

                    } else {
                        console.log('Guesses remaining: ' + that.guessesLeft);
                        console.log(that.currentWord.renderWord());
                        console.log("Letters guessed: " + that.guessedLetters);
                    }
                }
                if (that.guessesLeft > 0 && that.currentWord.wordFound === false) {
                    that.keepPromptingUser();
                } else if (that.guessesLeft === 0) {
                    console.log('Game over!');
                    console.log('The word you were guessing was: ' + that.currentWord.word);
                }
            } else {
                console.log("You've guessed that letter already. Try again.")
                that.keepPromptingUser();
            }
        });
    }
}

hangman.startGame();