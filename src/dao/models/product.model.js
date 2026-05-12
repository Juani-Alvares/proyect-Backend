import mongoose from "mongoose";

const schema = new mongoose.Schema({
    name: String,
    price: Number
})

export default mongoose.model("Product", schema);

import mongoosePaginate from "mongoose-paginate-v2";

const productSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  price: { type: Number, required: true },
  code: String,
  stock: Number,
  category: String,
  status: { type: Boolean, default: true }
});

productSchema.plugin(mongoosePaginate);

export const Product = mongoose.model("products", productSchema);