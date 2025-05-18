import mongoose from "mongoose";

const connectDb = async () => {
    await mongoose.connect('').then(()=>console.log('DB connected'))
}

export default connectDb