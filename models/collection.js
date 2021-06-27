const mongoose = require("mongoose");

const CollectionSchema = mongoose.Schema({
  collectionID: {
    type: String,
    required: true,
  },

  userName: {
    type: String,
    required: true,
  },
  messages: {
    type: Array,
    default: [],
    required: false,
  },
  useMail: {
    type: Boolean,
    default: false,
    required: false,
  },
  dateCreated: {
    type: Date,
    default: Date.now(),
    required: false,
  },
});

const Collection = mongoose.model("Collection", CollectionSchema);
module.exports = Collection;
