import mongoose, {Schema, Document, trusted} from "mongoose";

export interface message extends Document{
    content: string;
    createdAt: Date;
}

const messageSchema :Schema<message> = new Schema({
    content:{
        type: String,
        required: true 
    },
    createdAt:{
        type: Date,
        required: true,
        default: Date.now
    }
})

export interface User extends Document{
    username: string;
    email: string;
    password: string;
    verifyCode: string;
    verifyCodeExpiry: Date;
    isVerified: boolean;
    isAcceptingMessage: boolean;
    messages: message[];
}

const userSchema: Schema<User> = new Schema({
    username:{
        type: String,
        required: [true,"Username is required"],
        trim: true,
        unique: true
    },
    email:{
        type: String,
        required: [true,"Email is required"],
        unique: true,
        match: [/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm , "please use a valid email address"],
    },
    password:{
        type: String,
        required: [true,"Password is required"]
    },
    verifyCode:{
        type: String,
        required: [true,"verifyCode is required"]
    },
    isVerified:{
        type: Boolean,
        default: false,
    },
    isAcceptingMessage:{
        type: Boolean,
        default: true,
    },
    messages: [messageSchema]

})

const UserModel = (mongoose.models.User as mongoose.Model<User>) || mongoose.model<User>("User", userSchema)

export default UserModel;