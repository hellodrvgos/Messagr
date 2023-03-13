import mongoose, { Document } from "mongoose";

export type UserDocument = Document &{
    email: string;
    password: string;
    firstName: string;
    lastName: string;
}

const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    firstName: {
        type: String,
    },
    lastName: {
        type: String,
    }
})

export default mongoose.model<UserDocument>("User", UserSchema);