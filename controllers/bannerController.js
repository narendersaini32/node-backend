const { Banners } = require("../model/bannerSchema");

const addBannerController = (req, res) => {
    try {
        req.body.createdAt = new Date();
        Banners.create(req.body,
            (error, result) => {
                if (result) {
                    res.send({ success: true, message: "Banner is added", result });
                } else if (error) {
                    res.status(500).send({ success: false, message: "Server error occurred." });
                }
            }
        );
    }
    catch (error) {
        console.log("addBannerController -> error", error)
    }
}

const findBannerController = (req, res) => {
    try {
        Banners.find({}, (error, result) => {
            if (result) {
                res.send({ success: true, result });
            } else if (error) {
                res.status(500).send({ success: false, message: "Server error occurred." });
            }
        })
    } catch (error) {

    }
}
module.exports = {
    addBannerController,
    findBannerController
}


// Postman -> index.js -> /add/banner -> bannerController -> Banners -> Banner.create()