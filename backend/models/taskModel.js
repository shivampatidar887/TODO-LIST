const mongoose = require("mongoose");
const taskSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: true,
    },
    title: {
        type: String,
        required: [true, "Please Write the Title"],
        trim: true,// for avoid leading and trailing whitespace
        maxLength: [25, "Title cannot exceed 25 characters"]
    },
    description: {
        type: String,
        minlength: [20, "Description must have atleast 20 characters"],
        maxlength: [300, "Description cannot exceed 300 characters"]
      },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});
module.exports = mongoose.model("Task", taskSchema);
// export as a Post module