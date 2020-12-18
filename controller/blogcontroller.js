const { AppError } = require("../helper/ErrorClass");
const { sendErrorMessage } = require("../helper/sendError");
const { Blog } = require("../schema/blogSchema");
const multer = require("multer");
const uniqid = require("uniqid");
const path = require("path");
//AllBlogs
const getAllBlogs = async (req, res, next) => {
  try {
    await Blog.find(req.query)
      .then((data) => {
        res.send(data);
      })
      .catch((err) => {
        return err;
      });
  } catch (err) {
    console.log(err);
    return err;
  }
};

//Image Stroge Engin
const fileStrogeEngin = multer.diskStorage({
  destination: path.join(__dirname, "..", "uploads"),
  filename: (req, file, cb) => {
    cb(null, `Img${uniqid()}-${file.originalname}`);
  },
});
const upload = multer({ storage: fileStrogeEngin });
const uploadeImage = upload.single("uploaded_file");

//Adding Blog
const addBlogUpload = async (req, res, next) => {
  try {
    const newBlog = new Blog({
      author: req.body.author,
      title: req.body.title,
      content: req.body.content,
      links: [
        {
          id: req.body.linksBlogId,
        },
        { title: req.body.linksBlogTitle },
      ],

      imageUrl: `${path.join(__dirname, "..", "uploads")}/${req.file.filename}`,
    });
    newBlog
      .save()
      .then(async (data) => {
        if (req.body.linksBlogId) {
          const update = await Blog.findOneAndUpdate(
            { id: req.body.linksBlogId },
            {
              links: [
                {
                  id: data.id,
                  title: data.title,
                },
              ],
            }
          );
        }
      })
      .catch((err) => {
        console.log(err);
        return err;
      });
    return res.json({
      Image: await `http://localhost:3000${path.join(
        __dirname,
        "..",
        "uploads"
      )}/${req.file.filename}`,
    });
  } catch (err) {
    console.log(err);
    return err;
  }
};

//Getting Blog by Id
const getBlogById = async (req, res, next) => {
  try {
    const task = await Blog.findOne({ id: req.params.id }).select(
      "id  author  title  content  links imageUrl  -_id"
    );
    if (task) {
      console.log(task);
      return res.send(task);
    } else {
      return sendErrorMessage(
        new AppError(404, "Unsuccessful", "Not Valid Id"),
        req,
        res
      );
    }
  } catch (err) {
    console.log(err);
    return err;
  }
};

//Updateing Blog Id
const updateById = async (req, res, next) => {
  try {
    const task = await Blog.findOneAndUpdate({ id: req.params.id }, req.body, {
      runValidators: true,
      new: true,
    });
    return res.status(200).json({
      status: "Successful",
      data: task,
    });
  } catch (err) {
    console.log(err);
    return err;
  }
};

// Delete Blog
const deleteById = async (req, res, next) => {
  try {
    const task = await Blog.findOneAndRemove({ id: req.params.id });
    return res.status(200).json({
      status: "Successful",
      message: "Deleted Successfully",
    });
  } catch (err) {
    console.log(err);
    return err;
  }
};

module.exports.getAllBlogs = getAllBlogs;
module.exports.getBlogById = getBlogById;
module.exports.uploadeImage = uploadeImage;
module.exports.addBlogUpload = addBlogUpload;
module.exports.deleteById = deleteById;
module.exports.updateById = updateById;
