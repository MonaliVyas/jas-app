const mongoose = require('mongoose');
mongoose.set('useNewUrlParser', true);
mongoose.set('useUnifiedTopology', true);

mongoose.connect('mongodb://localhost/jas_dev')
.then(() => console.log('Connect to mongodb..'))
.catch(err => console.error('Could not connect to mongodb..', err));


//schema item
const itemSchema = new mongoose.Schema({
    ItemNo: Number,
    Name: String,
    DrawingNo: String,
    PartCode: String,
    Material: String,
    Price: Number
});

//class Item
const Item = mongoose.Schema('Item', itemSchema);


//db insert item
async function insertItem(){
    const item = new Item({
        ItemNo: 1,
        Name: 'Pipe',
        DrawingNo: '123x',
        PartCode: 'xxx',
        Material: 'Steel',
        Price: 50
    });

    const result = await item.save();
    console.log(result);
}

//db update item
async function updateItemByID(){
    const result = await Item.update({ _id: id}, {
        $set: {
            // ItemNo: 1,
            // Name: 'Pipe',
            // DrawingNo: '123x',
            // PartCode: 'xxx',
            // Material: 'Steel',
            // Price: 50
        }
    })
console.log(result);
}

//db delete item
async function deleteItemByID(id){
    const result = Item.deleteOne({_id: id});
}

//db select item
async function selectItem(){
    const result = await Item.find();
    return result;
}

//db select item by ID
async function selectItemByID(id){
    const result = await Item.findById(id);
    return result;
}

insertItem();