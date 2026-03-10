const mongoose = require("mongoose")

const requestSchema = new mongoose.Schema({

    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },

    asset: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Asset"
    },

    status: {
        type: String,
        enum: ["pending", "approved", "rejected"],
        default: "pending"
    },

    requestedOn: {
        type: Date,
        default: Date.now
    },

    actionTakenOn: Date

})

const Request = mongoose.model("Request", requestSchema)

module.exports = Request