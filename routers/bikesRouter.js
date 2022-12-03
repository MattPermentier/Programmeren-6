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

        let bikesCollection = {
            bikes: bikes,
            _links: {
                self: {
                    href: `${process.env.BASE_URI}bikes/`
                }
            },
            pagination: "Zet er nu iets in"
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
        let bike = await Bike.findById(req.params.id);
        if (bike == null) {
            res.status(404).send();
        } else {
            res.json(bike);
        }
    } catch {
        // id not found, send 404
        res.status(404).send()
    }
})

// middleware checkt header content-type
router.post("/", (req, res, next) => {
    if (req.header("Content-Type") == "application/json") {
        next();
    } else {
        res.status(415).send();
    }
});

// add resource to collection: POST /
router.post("/", async (req, res) => {
    console.log("POST request for collection /");

    let bike = Bike({
        brand: req.body.brand,
        model: req.body.model,
        power: req.body.power
    })

    try {
        await bike.save();
        res.status(201).send();
    } catch {
        res.status(500).send()
    }
})

router.options("/", (req, res) => {
    res.setHeader("Allow", "GET, POST, OPTIONS");
    res.send();
})

// export router
module.exports = router;