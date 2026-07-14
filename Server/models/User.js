// User schema — roles: admin, manager, receptionist, housekeeping, 

const mongoose = require("mongoose")
const bcrypt = require("bcryptjs")

const ROLES = ["admin", "manager", "receptionist", "housekeeping", "guest"]

const userSchema = new mongoose.Schema(
    {
        name:{
            type:String,
            required: [true, "Name is require"],
            trim: true,
        },
        email:
        {
          type:String,
          required: [true, "Email is require"],
          unique: true,
          lowercase: true,
          trim:true
        },
        password:{
            type: String,
            required: [true, "Passsword is require"],
            minlenght:8,
            select: false,
        },
        role:{
            type:String,
            enum: ROLES,
            default: "guest"
        },
    },
    {timestamps: true}
);

// password hash
userSchema.pre("save", async function () {
    if (!this.isModified("password")) return ;

        const salt = await bcrypt.genSalt(10)
        this.password = await bcrypt.hash(this.password, salt)
        
})

userSchema.methods.matchPassword = async  function  (enteredPassword) {
    return bcrypt.compare(enteredPassword, this.password)
}

module.exports = mongoose.model("User", userSchema)