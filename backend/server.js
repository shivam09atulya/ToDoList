const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");

mongoose.connect("mongodb://localhost:27017/Thinking", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(express.json());
app.use(cors());

const thoughtSchema = new mongoose.Schema({
  content: [String],
});

const Thought = mongoose.model("Thought", thoughtSchema);

app.get("/thoughts", (req, res) => {
  res.send("Server Reached");
});

app.post("/thoughts", (req, res) => {
  const { content } = req.body;
  const thoughts1 = new Thought({ content });

  thoughts1
    .save()
    .then((savedThought) => {
      res.json(savedThought);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ error: "Failed to save thought" });
    });
});

const port = 4000;

app.get("/", (req, res) => {
  res.send("Server running");
});

app.listen(port, () => {
  console.log(`Server running at ${port}`);
});
