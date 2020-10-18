const mongooes = require('mongoose');

let exceptionSchema = mongooes.Schema({
    message: String,
    name: String,
    stack: String,
    httpStatus: Number,
    customMsg: String
})

let exceptionModel = mongooes.model('exceptionLog',exceptionSchema);

const logger = (err) => {
    let newEx = new exceptionModel(err);
    newEx.save().then(data => {
        console.log('exception logged');
    }).catch(error => {
        console.log('exception occured');
    })
}

module.exports = logger;