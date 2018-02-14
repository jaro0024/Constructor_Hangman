
function Letter(character) {
    this.character = character;
    this.appear = false;
    this.letterRender = function () {
        if (this.appear) {
            return this.character;
        }
        else {
            return '_';
        }
    };
};

module.exports = Letter;