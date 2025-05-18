import mongoose from "mongoose";

const attendanceSchema = new mongoose.Schema({
  users: [
        {userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
      },
      status: { type: String, enum: ['Present', 'Absent', 'Leave'], default: 'Absent' },
}
  ],
  date: {
    type: Date,
    required: true,
    unique: true, // Prevent duplicate attendance for the same day
  }
}, { timestamps: true });

export default mongoose.model('Attendance', attendanceSchema);
