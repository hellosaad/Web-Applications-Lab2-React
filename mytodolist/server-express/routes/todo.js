const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const Todo = require("../models/Todo");

const privateKey = process.env.JWT_PRIVATE_KEY;

router.use(function (req, res, next) {
  if (req.header("Authorization")) {
    try {
      req.payload = jwt.verify(req.header("Authorization"), privateKey, {
        algorithms: ["RS256"], 
      });
    } catch (error) {
      return res.status(401).json({ error: error.message });
    }
  } else {
    return res.status(401).json({ error: "Unauthorized" });
  }
  next();
});

// Creating a new Todo
router.post("/", async function (req, res) {
  const { title, description, complete, dateCompleted } = req.body;
  const todo = new Todo({
    title,
    description,
    author: req.payload.id,
    complete: complete || false,
    dateCompleted: dateCompleted || null,
  });
  await todo
    .save()
    .then((savedTodo) => {
      return res.status(201).json(savedTodo);
    })
    .catch((error) => {
      return res.status(500).json({ error: error.message });
    });
});


router.get("/", async function (req, res) {
  const todos = await Todo.find().where("author").equals(req.payload.id).exec();
  return res.status(200).json({ todos });
});


router.delete("/:id", async function (req, res) {
  try {
    const deletedTodo = await Todo.findOneAndDelete({
      _id: req.params.id,
      author: req.payload.id
    });

    if (!deletedTodo) {
      return res.status(404).json({ error: "Todo not found or unauthorized" });
    }

    return res.status(200).json({ message: "Todo successfully deleted" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});





router.put("/:id", async function (req, res) {
  try {
    const { title, description, complete, dateCompleted } = req.body;
    const updatedTodo = await Todo.findOneAndUpdate(
      { _id: req.params.id, author: req.payload.id },
      { complete, dateCompleted },
      { new: true }
    );

    if (!updatedTodo) {
      return res.status(404).json({ error: "Todo not found or unauthorized" });
    }

    return res.status(200).json(updatedTodo);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});




module.exports = router;
