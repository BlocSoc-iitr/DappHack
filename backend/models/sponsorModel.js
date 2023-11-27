// - partner company
// - partner logo
// - partner description
// - prize tracks
// - Partner addresses and names
// - chainid
const mongoose = require("mongoose");
const sponsorSchema = new mongoose.Schema({
  sponsorDescription: {
    type: String,
    required: true,
  },
  prizetrackName: {
    type: String,
    required: true,
  },
  prize: {
    type: Number,
    required: true,
  },
  walletAddress: {
    type: String,
    required: true,
  },
  chainID: {
    type: String,
    required: true,
  },
});
const Sponsor = mongoose.model("Sponsor", sponsorSchema);
module.exports = Sponsor;
