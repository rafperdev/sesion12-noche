const { genSalt, hash } = require("bcryptjs");
const { model, Schema } = require("mongoose");

const userSchema = new Schema({
    usuario: {
        type: "string",
        unique: true,
        required: true
    },
    password: {
        type: "string",
        required: true,
        min: 6
    },
    rol: {
        type: "string",
        required: true
    }
});

userSchema.pre("save", async function (next) {
    const salt = await genSalt(10);
    this.password = await hash(this.password, salt);
    next();
});

const userModel = model("users", userSchema);

exports.userModel = userModel;