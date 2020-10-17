const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors'); 
const app = express();
app.use(cors());
app.use(express.json());

// app.use(bodyParser.json())
// const bill = require('./Bill/route/bill.route.js');
// const challan = require('./Challan/route/challan.route');
// const company = require('./Company/route/company.route');
// const item = require('./Item/route/item.route');
const user = require('./user/route/user.route');
const CustomError = require('./global/CustomError');
mongoose.set('useUnifiedTopology',true);

//app.use('/',bill);
app.use('/',user);
// app.use('/company',company);

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
    err.printError();
    response.status(err.httpStatus || 500).send({ message: err.message || err.customMsg || "Some error occurred while retrieving Users" })
})