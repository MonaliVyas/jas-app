class CustomError {
    constructor(err = '', httpStatus = 0, customMsg = "") {
        this.message = err.message || '';
        this.name = err.name || '';
        this.stack = err.stack || '';
        this.httpStatus = httpStatus;
        this.customMsg = customMsg;
    }

    printError() {
        console.log("Error Message")
        console.log(this.message);
        console.log("Error Name")
        console.log(this.name);
        console.log("Error Stack")
        console.log(this.stack);
        console.log("Error httpStatus")
        console.log(this.httpStatus);
        console.log("Error customMsg")
        console.log(this.customMsg);
    }
}

module.exports = CustomError;