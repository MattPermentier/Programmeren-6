// Bikes
const express = require("express");
const router = express.Router();

const Bike = require("../models/bikesModel");

// create route /
router.get("/", async (req, res) => {
    console.log("GET");
    try {
        let bikes = await Bike.find();
        res.json(bikes);
    } catch {
        res.status(500).send()
    }
})

// create route for detail
router.get("/:id", (req, res) => {
    // find(_id)
    console.log("GET");
    res.send(`${req.params.id}`);
})

// create route /
router.post("/", async (req, res) => {
    console.log("POST");

    // deze info moet uit reuest komen
    let bike = new Bike({
        brand: "Test",
        model: "F650 Funduro",
        power: "650CC"
    })

    try {
        await bike.save();

        res.json(bike);
    } catch {
        res.status(500).send()
    }

})


module.exports = router;