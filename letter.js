// Constructor function for creating Letter objects
function Letter(ltr) {
    this.ltr = ltr;
    this.appear = false;
    // Function to render letters
    this.letterRender = function () {
        if (this.ltr === "") {
            this.appear = true;
            return " ";
        }
        if (this.appear === false) {
            return " _ ";
        }
        else {
            return this.ltr;
        }
    };
};
// To export the Letter module
module.exports = Letter;