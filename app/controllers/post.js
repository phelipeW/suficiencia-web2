const post = require("../services/post.service")

async function create(req, res, next){
    try {
      const { body } = req;

      if(!body.description){        
        return res.status(401).json({ message: "Description is required!" });
    }

    if(body.description.length === 0){
        return res.status(401).json({ message: "Description should not be empty!" });
    }

    if(!body.name){
        return res.status(401).json({ message: "Name is required!" });
    }

    if(body.name.length === 0){
        return res.status(401).json({ message: "Name should not be empty!" });
    }

    if(!body.ingredients){
        return res.status(401).json({ message: "Ingredients is required!" });
    }

    if(body.ingredients.length === 0){
        return res.status(401).json({ message: "Ingredients should not be empty!" });
    }

    if(!body.price){
        return res.status(401).json({ message: "Price is required!" });
    }

    if(body.price <= 0){
        return res.status(401).json({ message: "Price should be greater than 0!" });
    }

    const result = await post.create(body,req.userId);

    if(result) {
        return res.json(result)
        
    } else {
        return res.status(404).json(result)
    }

    } catch (err) {

      res.status(400).json({ message: err.message })
      next(err)
    }
  }

async function list(req, res, next) {
    try {
        const postList = await post.findAll(req.query)
        return res.json(postList)
    } catch (err) {
        return res.status(400).json({ message: err.message })
        next(err)
    }
}
  

async function like(req, res, next) { 
    try {
        const postLiked = await post.like(req.params.id);
        if(postLiked){
            res.status(200).json(postLiked)
        } else {
            res.status(404).json({message: 'Post not found!'});
        }
    } catch (err) {
        res.status(400).json({ message: err.message })
        next(err)
    }
}

  module.exports = {
    create,
    list,
    like
  }