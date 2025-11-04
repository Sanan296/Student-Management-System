import mongoose from "mongoose";
import bcrypt from "bcryptjs"; 

const adminSchema = new mongoose.Schema({
    username: 
    { type: String, 
      required: true, 
      unique: true }, 
    password: 
    { type: String, 
    required: true 
},
},{
    timestamps: true,
});

// 1. Pre-Save Hook for Hashing
adminSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

// 🚨 CRITICAL: The matchPassword method MUST be defined here
adminSchema.methods.matchPassword = async function (enteredPassword) {
    // Compare the entered password with the hashed password in the DB
    return await bcrypt.compare(enteredPassword, this.password);
};

// 3. Model Creation
const Admin = mongoose.model("Admin", adminSchema); 
export default Admin;