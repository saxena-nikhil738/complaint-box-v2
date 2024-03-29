import mongoose from "mongoose";

const complaintSchema = new mongoose.Schema({
  appId: {
    type: String,
  },
  dateTime: {
    type: String,
  },
  name: {
    type: String,
  },
  email: {
    type: String,
  },
  category: {
    type: String,
    enum: ["electric", "furniture", "plumber", "cleaning", "data center"],
  },
  description: {
    type: String,
  },
  status: {
    type: String,
  },
  note: {
    type: String,
  },
});

const complaintData = mongoose.model("complaintData", complaintSchema);
export { complaintData };
