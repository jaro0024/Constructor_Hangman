//Require necessary npm package
var inquirer = require("inquirer");
var isLetter = require("is-letter");
//Require objects/exports
var Word = require("./word.js");

// Creating an object for Hangman
var hangman = {
    wordList: ["Dunkirk", "Fury", "Platoon", "Patton", "Glory", "Downfall", "Jarhead", "Braveheart"],
    guessesLeft: 7,
    guessedLetters: [],
    display: 0,
    currentWord: null,

    startGame: function () {
        console.log("\n");
        console.log("------------------------------------------------------------");
        console.log(" WELCOME TO THE WAR MOVIES HANGMAN GAME!");
        console.log("------------------------------------------------------------");
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
                console.log(" SEE YA!");
            }
        });
    },
    newGame: function () {
        this.guessedLetters = [];
        if (this.guessesLeft === 7) {
            console.log("------------------------------------------------------------");
            console.log(" READY SET GO!");
            // console.log("------------------------------------------------------------");
            console.log("\n");
            var randomWord = Math.floor(Math.random() * this.wordList.length);
            this.currentWord = new Word(this.wordList[randomWord]);
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
        console.log("\n");
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
                    console.log("------------------------------------------------------------");
                    console.log(" NOPE! TRY AGAIN!");
                    console.log("------------------------------------------------------------");
                    that.guessesLeft--;
                    that.display++;
                    console.log(" Guesses remaining: " + that.guessesLeft);
                    console.log("\n");
                    console.log(that.currentWord.renderWord());
                    console.log("\n");
                    console.log(" Letters guessed: " + that.guessedLetters);
                } else {
                    console.log("------------------------------------------------------------");
                    console.log(" YEP! KEEP GOING!");
                    console.log("------------------------------------------------------------");
                    if (that.currentWord.findWord() === true) {
                        console.log(" " + that.currentWord.renderWord());
                        console.log(" CONGRATS! YOU GOT IT RIGHT!!!");
                        hangman.playAgain();

                    } else {
                        console.log(" Guesses remaining: " + that.guessesLeft);
                        console.log("\n");
                        console.log(that.currentWord.renderWord());
                        console.log("\n");
                        console.log(" Letters guessed: " + that.guessedLetters);
                    }
                }
                if (that.guessesLeft > 0 && that.currentWord.wordFound === false) {
                    that.keepPromptingUser();
                }
                else if (that.guessesLeft === 0) {
                    console.log("------------------------------------------------------------");
                    console.log(" GAME OVER!");
                    console.log(" The correct word was: " + that.currentWord.word);
                    hangman.playAgain();
                }
            }
            else {
                console.log("------------------------------------------------------------");
                console.log(" YOU'VE GUESSED THAT LETTER ALREADY. TRY AGAIN.");
                console.log("------------------------------------------------------------");
                that.keepPromptingUser();
            }
        });
    },

    playAgain: function () {
        console.log("------------------------------------------------------------");
        var that = this;
        inquirer.prompt([{
            name: "play",
            type: "confirm",
            message: "Do you want to play again?"
        }]).then(function (answer) {
            if (answer.play) {
                that.newGame();
            } else {
                console.log(" SEE YA!");
            }
        });
    }
};

hangman.startGame();