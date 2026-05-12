import mongoose from "mongoose";

const userSchema = new mongoose.Schema({

    first_name: String,

    last_name: String,

    email: {
        type: String,
        unique: true
    },

    password: String,

    role: {
        type: String,
        default: "user"
    },

    cart: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "carts"
    }

});

const User = mongoose.model("users", userSchema);

export default User;