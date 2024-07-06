import mongoose, { Document, Model, Schema } from "mongoose";
import bcrypt from 'bcryptjs'

export interface IUser extends Document {
    username: string;
    email: string;
    password: string;
    avatar?: string;
}

const userSchema:Schema<IUser> = new Schema({
    username: {
        type: String,
        required: [true, "Please add an username"],
        trim: true,
        unique: true,
        lowercase: true
    },
    email:{
        type: String,
        required:[true, "Please add an email"],
        unique: true
    },
    password:{
        type: String,
        required: true
    },
    avatar:{
        type:String
    }
},
{
    timestamps: true,
},
)

//hash password
userSchema.pre<IUser>('save', async function (next) {
    if (!this.isModified('password')) {
      return next();
    }

    try {
      const salt = await bcrypt.genSalt(10);
      this.password = await bcrypt.hash(this.password, salt);
      next()
    } catch (error: any) {
      next(error)
    }
  });


const User: Model<IUser> = mongoose.model<IUser>("User", userSchema);

export default User;