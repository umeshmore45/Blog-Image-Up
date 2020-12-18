const mongoose = require("mongoose");
const uniqid = require("uniqid");

const blogSchema = new mongoose.Schema({
  id: {
    type: String,
    default: uniqid(),
  },
  author: {
    type: String,
    required: [true, "Please Entre Author Name"],
  },
  title: {
    type: String,
    required: [true, "Please Entre Title"],
  },
  content: {
    type: String,
    required: [true, "Please Entre Content"],
  },
  links: [
    {
      relatedBlogId: {
        type: String,
      },
      relatedBlogTitle: {
        type: String,
      },
    },
  ],

  imageUrl: {
    type: String,
  },
});

const Blog = mongoose.model("Blog", blogSchema);

module.exports.Blog = Blog;
