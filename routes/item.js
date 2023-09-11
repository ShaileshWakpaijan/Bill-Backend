const express = require("express");
const fetchuser = require("../middleware/fetchuser");
const router = express.Router();
const Item = require("../models/Item");

// ROUTE-1: Get all the notes using GET "/api/item/items". Login required
router.get("/:collection", fetchuser, async (req, res) => {
    try {
        const collectionId = req.params.collection;
        const items = await Item.find({ collectionId });
        res.json(items);
    } catch (err) {
        console.log(err.message);
        res.status(500).send("Internal Server Error");
    }
});

// ROUTE-2: Add a new note using POST "/api/item/additem". Login required
router.post("/:collection", fetchuser,

    async (req, res) => {
        try {
            const collectionId = req.params.collection;
            const { item, price } = req.body;
            const newItem = new Item({
                item,
                price,
                collectionId
            });
            const saveItem = await newItem.save();
            res.json(saveItem);
        } catch (err) {
            console.log(err.message);
            res.status(500).send("Internal Server Error");
        }
    }
);

// ROUTE-3: Delete existing note using DELETE "/api/notes/deletenote". Login required
router.delete("/delete/:id", fetchuser, async (req, res) => {
    try {
        // console.log(req.params.id)
        // Find the note to be deleted and delete it
        let item = await Item.findById(req.params.id);
        if (!item) {
            return res.status(404).send("Not Found");
        }

        item = await Item.findByIdAndDelete(req.params.id);
        res.json({ success: "Note has been deleted." });
    } catch (err) {
        console.log(err.message);
        res.status(500).send("Internal Server Error");
    }
});

// ROUTE-3: Delete existing note using DELETE "/api/notes/deletenote". Login required
router.delete("/collection/:collection", fetchuser, async (req, res) => {
    try {
        const collectionId = req.params.collection;
        const items = await Item.find({ collectionId });
        if (!items) {
            return res.status(404).send("Not Found");
        }
        items.forEach(async (elem) => {
            await Item.findByIdAndDelete(elem._id);
        })
        res.json({ success: "Note has been deleted." });
    } catch (err) {
        console.log(err.message);
        res.status(500).send("Internal Server Error");
    }
});


module.exports = router;  