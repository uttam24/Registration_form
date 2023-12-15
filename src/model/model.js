const mongoose = require("mongoose");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const empSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    phone: {
        type: Number,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    cpassword: {
        type: String,
        required: true,
    }
});

// empSchema.methods.createToken = async function () {
//     // console.log(this._id)
//     try {
//         const token = await jwt.sign({ _id: this._id },
//             "lmynameisuttamhaisjfslkjflsjffgjisfoisufdosdiufosdiufsod");
//         this.tokens = this.tokens.concat({ token: token });
//         await this.save();
//         return token;
//     } catch (error) {
//         console.log(error)
//     }
// }

empSchema.pre('save', async function (next) {
    this.password = await bcrypt.hash(this.password, 10);
    this.cpassword = await bcrypt.hash(this.password, 10);
    next();
    this.cpassword = undefined
})

const empCollection = new mongoose.model('empcollection', empSchema);
module.exports = empCollection