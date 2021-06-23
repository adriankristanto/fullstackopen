const http = require("http");
const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const logger = require("./utils/logger");
const config = require("./utils/config");
const bloglistRouter = require("./controllers/bloglist");

const mongoUrl = config.MONGODB_URI;
mongoose
  .connect(mongoUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  })
  .then(() => {
    logger.info("connected to MongoDB");
  })
  .catch((error) =>
    logger.error("error connecting to MongoDB:", error.message)
  );

app.use(cors());
app.use(express.json());

app.use("/api/blogs", bloglistRouter);

const PORT = config.PORT || 3001;
app.listen(PORT, () => {
  logger.info(`Server running on port ${PORT}`);
});
