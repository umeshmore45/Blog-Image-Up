const express = require("express");
const {
  getAllBlogs,
  getBlogById,
  uploadeImage,
  deleteById,
  updateById,
  addBlogUpload,
} = require("../controller/blogcontroller");

const blogRouter = express.Router();

blogRouter.route("/").get(getAllBlogs).post(uploadeImage, addBlogUpload);

blogRouter.route("/:id").get(getBlogById).patch(updateById).delete(deleteById);

module.exports.blogRouter = blogRouter;
