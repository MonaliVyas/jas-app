const mongoose = require('mongoose');
mongoose.set('useNewUrlParser', true);
mongoose.set('useUnifiedTopology', true);

mongoose.connect('mongodb://localhost/jas_dev')
.then(() => console.log('Connect to mongodb..'))
.catch(err => console.error('Could not connect to mongodb..', err));

//schema user
const userSchema = new mongoose.Schema({
    UserId: Number,
    FirstName: String,
    LastName: String,
    Username: String
});

//class User
const User = mongoose.model('User',userSchema);


//db insert user
async function insertUser(){
    const user = new User({
        UserId: 1,
        FirstName: 'Monali',
        LastName: 'Vyas',
        Username: 'monali.vyas'
    });

    const result = await user.save();
    console.log(result);
}

//db update user
async function updateUserByID(){
    const result = await User.update({ _id: id}, {
        $set: {
            // UserId: 1,
            // FirstName: 'Monali',
            // LastName: 'Vyas',
            // Username: 'monali.vyas'
        }
    })
    console.log(result);
}

//db delete user
async function deleteUserByID(id){
    const result = User.deleteOne({_id: id});
}

//db select user
function selectUser(){
    const result = await User.find();
    return result;
}

//db select user by ID
function selectUserByID(id){
    const result = await User.findById(id);
    return result;
}

insertUser();