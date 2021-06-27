const mongoose = require("mongoose");

const BetaTesterSchema = mongoose.Schema({
  email: {
    type: String,
    required: true,
    // REMEMBER TO INCLUDE UNIQUE VALIDATORS
  },

  dateCreated: {
    type: Date,
    default: Date.now(),
    required: false,
  },
});

const BetaTester = mongoose.model("BetaTester", BetaTesterSchema);
module.exports = BetaTester;
