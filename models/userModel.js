const { mongoose } = require("mongoose");

const userSchema = mongoose.Schema(
    {
        username: {
            type: String,
            required: [true, "Please add an username"],
            unique: [true, "Username already taken"],
        },
        email: {
            type: String,
            required: [true, "Please add the email address"],
            unique: [true, "Email address already taken"],
        },
        password: {
            type: String,
            required: [true, "Please add your password"],
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model('User', userSchema);