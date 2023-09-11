const mongoose = require("mongoose");
const { Schema } = mongoose;

const CollectionSchema = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
    },
    collectionName: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now,
    },
});

const Collection = mongoose.model("collection", CollectionSchema);
Collection.createIndexes();
module.exports = Collection;  