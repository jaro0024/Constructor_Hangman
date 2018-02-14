
function Letter(character) {
    this.character = character;
    this.show = false;
    this.letterRender = function () {
        if (this.show) {
            return this.character;
        }
        else {
            return '_';
        }
    };
};

module.exports = Letter;