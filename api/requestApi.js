const express = require("express")
const router = express.Router()

const Request = require("../models/requestModel")
const Asset = require("../models/assetModel")

const auth = require("../middlewares/auth")
const adminMiddleware = require("../middlewares/adminMiddleware")


// VIEW USER REQUESTS
router.get("/requests", auth, async (req, res) => {

    const requests = await Request.find({
        user: req.user.user
    }).populate("asset")

    res.json({ requests: requests })

})


// USER REQUEST ASSET
router.post("/requestAsset", auth, async (req, res) => {

    const { assetId } = req.body

    if (!assetId) {
        return res.json({
            message: "Please provide assetId"
        })
    }

    const asset = await Asset.findById(assetId)

    if (!asset) {
        return res.json({
            message: "Asset not found"
        })
    }

    if (asset.status === "assigned") {
        return res.json({
            message: "Asset already assigned"
        })
    }

    const request = new Request({
        user: req.user.user,
        asset: assetId,
        status: "pending"
    })

    await request.save()

    res.json({
        message: "Asset request created",
        request: request
    })

})


// ADMIN ASSIGN ASSET
router.post("/assignAsset", auth, adminMiddleware, async (req, res) => {

    const { assetId, userId } = req.body

    const asset = await Asset.findById(assetId)

    if (!asset) {
        return res.json({
            message: "Asset not found"
        })
    }

    if (asset.status === "assigned") {
        return res.json({
            message: "Asset must be returned before reassignment"
        })
    }

    asset.status = "assigned"
    asset.assignedTo = userId

    await asset.save()

    res.json({
        message: "Asset assigned successfully"
    })

})


// USER RETURN ASSET
router.post("/returnAsset", auth, async (req, res) => {

    const { assetId } = req.body

    const asset = await Asset.findById(assetId)

    if (!asset) {
        return res.json({
            message: "Asset not found"
        })
    }

    asset.status = "available"
    asset.assignedTo = null

    await asset.save()

    res.json({
        message: "Asset returned successfully"
    })

})

module.exports = router