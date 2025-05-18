import mongoose from "mongoose";

const connectDb = async () => {
    await mongoose.connect('mongodb+srv://qasimayubrashid:ajKPXq7DQ7wl8pYe@attendance-management.upjsb.mongodb.net/?retryWrites=true&w=majority&appName=attendance-management').then(()=>console.log('DB connected'))
}

export default connectDb