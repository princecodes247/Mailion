const mongoose = require("mongoose");

const CodeSchema = mongoose.Schema({
    email: {
        type: String,
        required: true,
    },
    code: {
        type: String,
        required: true,
    },
    dateCreated: {
        type: Date,
        default: Date.now(),
        expires: 600,
    }
});

module.exports = mongoose.model("Code", CodeSchema);
