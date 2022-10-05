const express = require("express");
const cors = require("cors");
const port = 3000;

const dotenv = require("dotenv");
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const db = require("./app/models");
db.sequelize.sync();

// Routes
const userRouter = require("./app/routes/user");
// const postRouter = require('./app/routes/post')
// const commentRouter = require('./app/routes/comment')

app.get("/", (req, res) => {
    res.send("Hello World!");
});

app.use("/users", userRouter);
app.use("/posts", postRouter);
app.use("/comments", commentRouter);

app.listen(port, () => {
    console.log(`API listening on port ${port}`);
});
