const { httpCode } = require("../config");
const { requireLogin } = require("../middleware");
const { User, Task } = require("../models");

const router = require("express").Router();
router.use(requireLogin);

router.post("/", async (req, res) => {
  // them moi
  try {
    const newTask = new Task(req.body);
    await User.findByIdAndUpdate(req.user._id, { $push: { tasks: newTask } });
    res.status(httpCode.SUCCESS).json({ msg: "Them task thanh cong" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
});

router.put("/:id", async (req, res) => {
  // chinh sua
  try {
    const user = await User.findById(req.user._id);
    const task = user.tasks.id(req.params.id);
    Object.assign(task, req.body);
    await user.save();
    res.status(httpCode.SUCCESS).json({ msg: "Cap nhat task thanh cong" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
});

router.delete("/:id", async (req, res) => {
  // xoa
  try {
    const user = await User.findById(req.user._id);
    const task = user.tasks.id(req.params.id);
    task.active = false;
    await user.save();
    res.status(httpCode.SUCCESS).json({ msg: "Xoa task thanh cong" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
});

router.get("/:id", async (req, res) => {
  // lay theo id
  try {
    const user = await User.findById(req.user._id);
    const task = user.tasks.id(req.params.id);
    res.status(httpCode.SUCCESS).json({ task });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
});
router.get("/", async (req, res) => {
  // lay nhieu
  try {
    const user = await User.findById(req.user._id);
    const tasks = user.tasks.filter((task) => task.active);
    res.status(httpCode.SUCCESS).json({ tasks });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
});

module.exports = router;
