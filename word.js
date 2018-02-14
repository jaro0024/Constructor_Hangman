var Letter = require("./letter.js");

function Word(newWord) {
    this.newWord = newWord;
    this.ltrs = [];
    this.found = false;
    
    this.getLtr = function() {
        for(var i = 0; i < this.newWord.length; i++) {
            this.ltrs.push(new Letter(this.newWord[i]));
        }
    };

    this.findWord = function() {
        var count = 0;
        for(var i = 0; i < this.ltrs.length; i++) {
            if(this.ltrs[i].appear) {
                count++;
            }
        }
        if(count === this.ltrs.length) {
            this.found = true;
        }
        return this.found;
    };

    this.checkLetter = function (guessedLetter) {
        var whatToReturn = 0;
        for(var i = 0; i < this.ltrs.length; i++) {
            if(this.ltrs[i].character === guessedLetter) {
                this.ltrs[i].appear = true;
                whatToReturn++;
            }
        }
        return whatToReturn;
    };

    this.renderWord = function() {
        var str = "";

        for(var i = 0; i < this.ltrs.length; i++) {
            str += this.ltrs[i].letterRender();
        }
        return str;
    };
};

module.exports = Word;