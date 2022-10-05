
  const comment = require("../services/comment.service")
  
  async function create(req, res, next) { 
    try {
        const { body, params } = req;
        await comment.create(res, body, params.id);
    } catch (err) {
        res.status(400).json({ message: err.message })
        next(err)
    }
  }

  async function list(req, res, next) {
    try {
        const { params} = req;
        const commentList = await comment.findAll(params.id)
        if(commentList.message) {
            res.status(404).json(commentList)

        } else {
            res.json(commentList)
        }
      } catch (err) {
        res.status(400).json({ message: err.message })
        next(err)
      }
  }

  module.exports = {
    create,
    list
  }