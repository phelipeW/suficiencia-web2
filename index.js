const express = require('express');
const cors = require("cors");
const { User } = require('./app/models');
const port = 3000

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routes
const userRouter = require('./app/routes/user')


app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.use('/users', userRouter);

app.listen(port, () => {
    console.log(`API listening on port ${port}`)
  })