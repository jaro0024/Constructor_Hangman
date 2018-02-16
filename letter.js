// Constructor function for creating Letter objects
function Letter(ltr) {
    this.ltr = ltr;
    this.appear = false;
    // Function to render letters
    this.letterRender = function () {
        if (this.appear) {
            return this.ltr;
        }
        else {
            return ' _ ';
        }
    };
};

// To export the Letter module
module.exports = Letter;