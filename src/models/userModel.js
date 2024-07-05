import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: {
        type: "string",
        required: [true, "please Provide Username"],
        unique: true,
    },
    email: {
        type: "string",
        required: [true, "please Provide Email"],
        unique: true,
    },
    password: {
        type: "string",
        required: [true, "please Provide Password"],
    },
    isVerified: {
        type: "boolean",
        default: false,
    },
    isAdmin: {
        type: "boolean",
        default: false,
    },
    forgotPasswordToken: "string",
    forgotPasswordTokenExpiry: Date,
    verifyToken: "string",
    verifyTokenExpiry: Date,
});

const User = mongoose.models.users || mongoose.model("users", userSchema);

export default User;
