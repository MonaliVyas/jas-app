const mongoose = require('mongoose');
const Item = require('../model/item.model');
const Joi = require('joi');
//db insert item

const schema = Joi.object().keys({
    ItemNo: Joi.string().required().messages({

    }),
    Name: Joi.string().required().messages({

    }),
    DrawingNo: Joi.string().required().messages({

    }),
    PartCode: Joi.string().required().messages({

    }),
    Material: Joi.string().required().messages({

    }),
    Price: Joi.string().required().messages({

    }),
    ValidTo: Joi.date(),
    ValidFrom: Joi.date(),
    CreatedBy: Joi.number()
})

const insertItem = (request, response) => {
    const item = new Item({
        ItemNo: 1,
        Name: 'Pipe',
        DrawingNo: '123x',
        PartCode: 'xxx',
        Material: 'Steel',
        Price: 50,
        ValidTo: '20/12/2019',
        ValidFrom: '22/12/2019',
        CreatedBy: 1
    });
    item.save().then(item => {
            response.status(200).send({
                    message: "Record inserted successfully."
            });
    }).catch(error => {
            response.status(500).send({
                message: error.message || "some error occured while inserting the record."
            });
    })
}

//db update item
const updateItemByID = (request, response) => {
    Item.update({ _id: request.params.itemId}, {
        $set: {
            ItemNo: 2,
            Name: 'plate',
            DrawingNo: '120u',
            PartCode: 'xxx',
            Material: 'Steel',
            Price: 150,
            ValidTo: '20/12/2019',
            ValidFrom: '22/12/2019',
            CreatedBy: 1,
            CreatedOn: '20/12/2019'
        }
    }).then(result => {
        response.status(200).send({
            message: "Record updated successfully."
        })
    }).catch(error => {
        response.status(500).send({
            message: error.message || "some error occured while inserting the record."
        })
    });

}

//db delete item
const deleteItemByID = (request, response) => {
    Item.deleteOne({_id: request.params.itemId}).then(result => {
        response.status(200).send({
            message: "Record deleted successfully"
        })
    }).catch(error => {
        response.status(500).send({
            message: error.message || "some error occured while deleting the record."
        })
    });
}

//db select item
const selectItem = (request, response) => {
    Item.find().then(items => {
        if (!items) {
            response.status(404).send({
                message: "No data found "
            });
            retrun;
        }
        response.status(200).send(items);
    }).catch(error => {
        response.status(500).send({
            message: err.message || "Some error occurred while creating the Note."
        })
    });
}

//db select item by ID
const selectItemByID = (request, response) => {
    Item.findById(request.params.itemId).then(item => {
        if (!item) {
            response.status(404).send({
                message: "No data found "
            });
            retrun;
        }
        response.status(200).send(item);
    }).catch(error => {
        response.status(500).send({
            message: error.message || "Some error occurred while creating the Note."
        })
    });
}

exports.insertItem = insertItem;
exports.selectItem = selectItem;
exports.updateItemByID = updateItemByID;
exports.deleteItemByID = deleteItemByID;
exports.selectItemByID = selectItemByID;