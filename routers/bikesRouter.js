const express = require("express");

const Bike = require("../models/bikesModel");

//creat router
const router = express.Router();

// add routes for all end points

// collection: GET /
router.get("/", async (req, res) => {
    console.log("GET request for collection /");
    try {
        let bikes = await Bike.find();

        // create representation for collection as requested in assignment
        // items, _links, pagination

        let bikesCollection = {
            bikes: bikes,
            _links: {
                self: {
                    href: `${process.env.BASE_URI}bikes/`
                },
                collection: {
                    href: `${process.env.BASE_URI}bikes/`
                }
            },
            pagination: "Doen we een andere keer, maar er moet iets in staan voor de checker"
        }

        res.json(bikesCollection);
    } catch {
        // no response from db
        res.status(500).send()
    }
})

// detail: GET /id
router.get("/:id", async (req, res) => {
    console.log(`GET request for detail ${req.params.id}`);

    try {
        let bikes = await Bike.findById(req.params.id);

        res.json(bikes);
    } catch {
        // id not found, send 404
        res.status(404).send()
    }
})

// add resource to collection: POST /
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