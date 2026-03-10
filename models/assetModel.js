const mongoose = require("mongoose");

const assetSchema = new mongoose.Schema({
    name: String,
    type: String,
    status: {
        type: String,
        default: "available"
    },
    assignedTo: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        default: null
    }
});

module.exports = mongoose.model("Asset", assetSchema);