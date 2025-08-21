const express = require("express");
const multer = require("multer");
const postModel = require("./models/post.model");
const uploadFile = require("./services/store.service");

const app = express();
app.use(express.json());

// multer memory storage
const storage = multer.memoryStorage();
const upload = multer({ storage });

// CREATE POST
app.post("/posts", upload.single("mama"), async (req, res) => {
  try {
    const caption = req.body.caption;
    const file = req.file.buffer;

    // Upload file to ImageKit
    const result = await uploadFile(file, Date.now().toString());

    // Save in MongoDB
    const post = await postModel.create({
      caption: caption,
      image: result.url, // save ImageKit URL
    });

    res.json({
      message: "Post created successfully.",
      post,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Something went wrong" });
  }
});

// GET POSTS
app.get("/posts", async (req, res) => {
  try {
    const posts = await postModel.find();
    res.json(posts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching posts" });
  }
});

module.exports = app;
