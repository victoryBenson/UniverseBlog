import mongoose, { Document, Model, Schema } from "mongoose";
import bcrypt from 'bcryptjs'
import validator from "validator";

export interface IUser extends Document {
    username: string;
    email: string;
    password: string;
    avatar?: string;
    otp?: string;
    otpExpires?: Date;
}

const userSchema:Schema<IUser> = new Schema({
    username: {
        type: String,
        required: true,
        trim: true,
        lowercase: true
    },
    email:{
        type: String,
        required:true,
        unique: true,
        lowercase: true,
        trim: true,
        validate:[validator.isEmail, "Pls use a valid email format"]
    },
    password:{
        type: String,
        required: true,
        trim: true,
        validate:[validator.isStrongPassword, "Please use a strong password"]
    },
    otp:{
      type: String
    },
    otpExpires:{
      type: Date
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