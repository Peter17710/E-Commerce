import mongoose, { Types } from "mongoose";
import bcrypt from "bcrypt"


const userSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: true,
        minLength: [2, 'too short category name']
    },
    email: {
        type: String,
        unique: true
    },
    wishList:[{
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'Product',
    }],
    address:[{
        city: String,
        street: String,
        phone: String
    }],
    password: String,
    role:{
        type:String,
        enum:["user","admin"],
        default:"user"
    },
    confirmEmail:{
        type: Boolean,
        default: false
    },
    isBlocked:{
        type: Boolean,
        default: false
    },
    changePasswordAt: Date,
   
},
{timestamps: true , versionKey:false})


    userSchema.pre("save" , function () {
        console.log(this);
        this.password = bcrypt.hashSync(this.password , 7)
    })

    userSchema.pre("findOneAndUpdate", function (next) {
        if (!this._update.password) return next(); // Skip if password is not being updated
        this._update.password = bcrypt.hashSync(this._update.password, 7);
        next();
    });

    userSchema.pre(/^find/, function (next) {
    this.populate("wishList");
    next();
});

     export const User = mongoose.model('User' , userSchema)


