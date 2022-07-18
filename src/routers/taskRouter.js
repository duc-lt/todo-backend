const { httpCode } = require("../config");
const { requireLogin } = require("../middleware");
const { Task } = require("../models");

const router = require("express").Router();
router.use(requireLogin);

router.post("/", async (req, res) => {
  // them moi
  try {
    const { error, value } = Task.validate(req.body);
    if (error) {
      return res.status(httpCode.BAD_REQUEST).json({ msg: error.message });
    }

    const newTask = new Task({
      ...value,
      user: req.user._id,
    });

    await newTask.save();
    res.status(httpCode.SUCCESS).json({ msg: "Them task thanh cong" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
});

router.put("/:id", async (req, res) => {
  // chinh sua
  try {
    await Task.findByIdAndUpdate(req.params.id, req.body);
    res.status(httpCode.SUCCESS).json({ msg: "Cap nhat task thanh cong" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
});

router.delete("/:id", async (req, res) => {
  // xoa
  try {
    await Task.findByIdAndUpdate(req.params.id, { active: false });
    res.status(httpCode.SUCCESS).json({ msg: "Xoa task thanh cong" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
});

router.get("/:id", async (req, res) => {
  // lay theo id
  try {
    const task = await Task.findOne({
      _id: req.params.id,
      active: true,
      user: req.user._id,
    });

    if (!task) {
      return res.status(404).json({ msg: "Khong tim thay task" });
    }

    res.status(httpCode.SUCCESS).json({ task });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
});
router.get("/", async (req, res) => {
  // lay nhieu
  try {
    const tasks = await Task.find({ active: true, user: req.user._id });
    res.status(httpCode.SUCCESS).json({ tasks });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
});

module.exports = router;
