const post = require("../services/post.service")

async function create(req, res, next){
    try {
      const { body } = req;
      
      await post.create(
        res,
        body, 
        req.userId
      );
    } catch (err) {
      res.status(400).json({ message: err.message })
      next(err)
    }
  }

  async function list(req, res, next) {
    console.log(req.query)
    try {
      const postList = await post.findAll(req.query)
      res.json(postList)
    } catch (err) {
      res.status(400).json({ message: err.message })
      next(err)
    }
  }
  
  module.exports = {
    create,
    list
  }