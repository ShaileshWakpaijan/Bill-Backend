const mongoose = require("mongoose");
const { Schema } = mongoose;

const ItemSchema = new Schema({
    collectionId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "collection",
    },
    item: {
        type: String,
        required: true,
    },
    price: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now,
    },
});

const Item = mongoose.model("item", ItemSchema);
Item.createIndexes();
module.exports = Item;  