// import mongoose from "mongoose";

// const studentSchema = new mongoose.Schema({
//   name: { type: String, required: true },
//   roll: { type: String, required: true, unique: true },
//   department: { type: String, required: true },
//   cgpa: { type: Number, required: true },
//   dob: { type: String, required: true },
// });

// const Student = mongoose.model("Student", studentSchema);
// export default Student;
import mongoose from "mongoose";

const studentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  roll: { type: String, required: true },
  department: { type: String, required: true },
  cgpa: { type: String, required: true },
  dob: { type: String, required: true },
},
{
  timestamps: true
}
);

const Student = mongoose.model("Student", studentSchema);
export default Student;
