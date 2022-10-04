const express = require('express');
const cors = require("cors");
const { User } = require('./app/models');
const port = 3000

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const db = require("./app/models");
// db.sequelize.sync();

// Routes
const userRouter = require('./app/routes/user')
const postRouter = require('./app/routes/post')


app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.use('/users', userRouter);
app.use('/posts', postRouter);


app.listen(port, () => {
    console.log(`API listening on port ${port}`)
  })