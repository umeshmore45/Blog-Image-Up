const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });
const mongoose = require("mongoose");
const { blogRouter } = require("./routes/blogRouter");

mongoose
  .connect(process.env.DATABASE_URL, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => {
    const app = express();

    app.use(cors());
    app.use(express.json());

    app.use("/blogs", blogRouter);

    app.listen(process.env.PORT, () => {
      console.log(`On Port ${process.env.PORT}`);
    });
  })
  .catch((err) => {
    console.log(err);
    return err;
  });
