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
const user = require('./User/routes/user.route');
mongoose.set('useUnifiedTopology',true);

//app.use('/',bill);
app.use('/',user);

app.listen(3000, () => {
    console.log('Listening to 3000.');
});

mongoose.connect('mongodb://localhost/jas_dev',{useNewUrlParser: true})
.then(() => console.log('Connect to mongo...'))
.catch(err => console.log('Could not connect to mongo ',err));