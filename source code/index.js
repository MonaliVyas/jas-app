const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors'); 
const app = express();
app.use(cors());
app.use(express.json());

const bill = require('./Bill/route/bill.route.js');
const challan = require('./Challan/route/challan.route');
const company = require('./Company/route/company.route');
const item = require('./Item/route/item.route');
const user = require('./user/route/user.route');
const CustomError = require('./global/CustomError');
const Logger = require('./global/Logger');
mongoose.set('useUnifiedTopology',true);

app.use('/bill',bill);
app.use('/challan',challan);
app.use('/company',company);
app.use('/item',item);
app.use('/user',user);

app.use('*',function (request, response, next) {
    next(err);
})

app.listen(3000, () => {
    console.log('Listening to 3000.');
});

mongoose.connect('mongodb://localhost/jas_dev',{useNewUrlParser: true})
.then(() => console.log('Connect to mongo...'))
.catch(err => console.log('Could not connect to mongo ',err));

app.use(function(err, request, response, next){
    console.log('Next fn');
    err.printError();
    Logger(err);
    response.status(err.httpStatus || 500).send({ message: err.customMsg || err.message || "Some error occurred while retrieving Users" })
});

process.on('unhandledRejection', (error) => {
    console.log('unhandledRejection');
    console.log(error);
    Logger(new CustomError(error, 0, 'unhandledRejection'))
    process.exit()
    //is trusted?
});
// // .on('uncaughtException', err => {
//     console.error(err, 'Uncaught Exception thrown');
//     process.exit(1);
//   });