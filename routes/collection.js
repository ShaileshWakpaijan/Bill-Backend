const express = require("express");
const fetchuser = require("../middleware/fetchuser");
const router = express.Router();
const Collection = require("../models/Collection");

// ROUTE-1: Get all the notes using GET "/api/item/items". Login required
router.get("/", fetchuser, async (req, res) => {
    try {
        const collections = await Collection.find({ user: req.user.id });
        res.json(collections);
    } catch (err) {
        console.log(err.message);
        res.status(500).send("Internal Server Error");
    }
});

// ROUTE-2: Add a new collection using POST . Login required
router.post("/",fetchuser,
    async (req, res) => {
        try {
            const { collectionName } = req.body;
            const newCollection = new Collection({
                user: req.user.id,
                collectionName,
            });
            const saveCollection = await newCollection.save();
            res.json(saveCollection);
        } catch (err) {
            console.log(err.message);
            res.status(500).send("Internal Server Error");
        }
    }
);

// ROUTE-3: Delete existing note using DELETE "/api/notes/deletenote". Login required
router.delete("/:id", fetchuser, async (req, res) => {
    try {
        // Find the note to be deleted and delete it
        let collection = await Collection.findById(req.params.id);
        if (!collection) {
            return res.status(404).send("Not Found");
        }

        // Allow deletion only if user owns this Note
        if (collection.user.toString() !== req.user.id) {
            return res.status(401).send("Not Allowed");
        }

        collection = await Collection.findByIdAndDelete(req.params.id);
        res.json({ success: "Note has been deleted." });
    } catch (err) {
        console.log(err.message);
        res.status(500).send("Internal Server Error");
    }
});

module.exports = router;  