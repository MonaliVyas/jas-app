const mongooes = require('mongoose');
const fs = require('fs');
const { string } = require('joi');

let exceptionSchema = mongooes.Schema({
    exceptionDatetime: String,
    message: String,
    name: String,
    stack: String,
    httpStatus: Number,
    customMsg: String
})

let exceptionModel = mongooes.model('exceptionLog', exceptionSchema);

const logger = (err) => {
    try {
        let newEx = new exceptionModel(err);
        newEx.save().then(data => {
            console.log('exception logged');
        }).catch(error => {
            logIntoFile(err, error);
        })
    } catch (error) {
        logIntoFile(err, error);
    }

}

const logIntoFile = (errSuper, err) => {
    fs.appendFile('logError.txt', '\nSuper Error' + JSON.stringify(errSuper) + 'Logger Error: ' + err.message, (error) => {
        if (error) console.log(error);
        else console.log("Saved!");
    })
}

module.exports = logger;