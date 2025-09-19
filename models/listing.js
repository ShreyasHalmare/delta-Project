const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Review = require("./review.js");
const { coordinates } = require("@maptiler/client");
const { required } = require("joi");

const listingSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: String,
  // image :{
  //     type: String,
  //     default:"https://unsplash.com/photos/beach-seashore-during-sunset-uQDRDqpYJHI",
  //     set: (v) =>v === ""
  //     ? "https://unsplash.com/photos/beach-seashore-during-sunset-uQDRDqpYJHI"
  //      : v ,

  // },
  // replace your current image: { ... } with this:
  image: {
    url: String,
    filename: String,
  },
  price: Number,
  location: String,
  country: String,
  reviews: [
    {
      type: Schema.Types.ObjectId,
      ref: "Review",
    },
  ],
  owner: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  geometry: {
    type: {
      type: String, //Dont do {location: {type: string}}
      enum: ["Point"],  // 'location.type' must be 'Point'
      required: true,
    },
    coordinates: {
      type: [Number],
      requires: true,
    },
  },

});

listingSchema.post("findOneAnddelete", async (listing) => {
  if (listing) {
    await Review.deleteMany({ _id: { $in: listing.reviews } });
  }
});

const Listing = mongoose.model("Listing", listingSchema);
module.exports = Listing;