const Task = require("../models/taskModel");
const catchasyncerror = require("../middleware/catchasyncerror")
// Create new Task (only logged in user)
exports.createTask = catchasyncerror(async(req,res,next)=>{
    req.body.user=req.user.id;
    const task= await Task.create(req.body);
    res.status(201).json({
        success:true,
        task,
    })
});

// Get My All tasks
exports.getAllTasks = catchasyncerror(async(req,res)=>{
    const tasks = await Task.find({ user: req.user.id });
    res.status(200).json({
        success:true,
        tasks,
    })
}) ;

// Update My Task(only creator of the post)
exports.updateTask =catchasyncerror(async (req, res, next) => {
    let task = await Task.findById(req.params.id);
    if (!task) {
        return res.status(500).json({
            success:false,
            message:"Task Not Found with this id"
        })
    }

    task = await Task.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    })
    res.status(200).json({
        success: true,
        task
    })
}) ;

// Delete My task
exports.deleteTask =catchasyncerror(async (req, res, next) => {
    const task = await Task.findById(req.params.id);
    if (!task) {
        return res.status(404).json({
            success:false,
            message:"Task Not Found with this id"
        })
      };
      await Task.findByIdAndDelete(task._id);
      res.status(200).json({
        success: true,
        message: "Task Deleted Successfully",
      });
});


  