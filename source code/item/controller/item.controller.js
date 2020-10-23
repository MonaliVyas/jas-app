const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const CustomError = require('../../global/CustomError');
const Item = require('../model/item_db.model');
const Item_joi = require('../model/item_joi.model');

//db insert item
const insertItem = (request, response, next) => {
    try {
        let reqBody = request.body;
        let item = new Item(reqBody);
        let result = Item_joi.validate(reqBody, { abortEarly: false });

        if (!result.error) {
            item.save().then(data => {
                response.status(200).send({ message: "Record inserted successfully" })
            }).catch(err => {
                next(new CustomError(err, 500, 'Some error occured while inserting the item'));
                });
        } else {
            next(new CustomError('', 400, result));
        }
    } catch (err) {
        next(new CustomError(err, 500, "Internal server error"))
    }
}

//db update item
const updateItemByID = (request, response, next) => {
    try {
        let reqBody = request.body;
        let result = Item_joi.validate(reqBody, { abortEarly: false });
        let itemId = request.params.itemId;

        if (!result.error) {
            Item.update({ _id: itemId }, {
                $set: reqBody
            }).then(data => {
                if (data) {
                    response.status(200).send({ message: "Record updated successfully." });
                }
                else next(new CustomError('', 404, 'Item not found'))
            }).catch(err => {
                next(new CustomError(err, 500, 'Some error occured while updating the item'));
            });
        } else {
            next(new CustomError('', 400, result));
        }
    } catch (err) {
        next(new CustomError(err, 500, "Internal server error"))
    }
}

//db delete item
const deleteItemByID = (request, response, next) => {
    try {
        let itemId = request.params.itemId

        Item.deleteOne({ _id: itemId }).then(data => {
            if (data) {
                response.status(200).send({ message: "Record deleted successfully" });
            }
            else next(new CustomError('', 404, 'Item not found')) 
        }).catch(err => {
            next(new CustomError(err, 500, "Some error occurred while deleting the item"));
        });
    } catch (err) {
        next(new CustomError(err, 500, "Internal server error"))
    }
}

//db select item
const selectItem = (request, response, next) => {
    try {
        Item.find().then(data => {
            if (data) {
                response.status(200).send(data);
            }
            else next(new CustomError('', 404, 'No data found'))
        }).catch(err => {
            next(new CustomError(err, 500, "Some error occurred while retrieving the items"));
        });
    } catch (err) {
        next(new CustomError(err, 500, "Internal server error"));
    }
}

//db select item by ID
const selectItemByID = (request, response, next) => {
    // abc();
    try {
        let itemId = request.params.itemId;

        Item.findById(request.params.itemId).then(data => {
            if (data) {
                response.status(200).send(data);
            }
            else next(new CustomError('', 404, 'Item not found'));
        }).catch(err => {
            next(new CustomError(err, 500, "Some error occurred while retrieving the item"));
        });
    } catch (err) {
        next(new CustomError(err, 500, "Internal server error"));
    }
}


exports.insertItem = insertItem;
exports.selectItem = selectItem;
exports.updateItemByID = updateItemByID;
exports.deleteItemByID = deleteItemByID;
exports.selectItemByID = selectItemByID;