const { default: mongoose } = require("mongoose");
const schema = mongoose.Schema;

const ProductSchema = new schema(
  {
    title: { type: String, required: true, unique },
    desc: { type: String, required: true },
    img: { type: String, required: true },
    categories: { type: Array },
    size: { type: String },
    color: { type: String },
    price: { type: Number, required: true },

    isAdmin: { type: Boolean, default: false },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", ProductSchema);
