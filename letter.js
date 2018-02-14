
function Letter(ltr) {
    this.ltr = ltr;
    this.show = false;
    this.letterRender = function () {
        if (this.show) {
            return this.ltr;
        }
        else {
            return '_';
        }
    };
};

module.exports = Letter;