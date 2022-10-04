const { Op } = require('sequelize')
const db = require('../models')

const Post = db.post

async function create(res, post, auth) {
    if(!post.description){        
        return res.status(401).json({ message: "Description is required!" });
    }

    if(post.description.length === 0){
        return res.status(401).json({ message: "Description should not be empty!" });
    }

    if(!post.name){
        return res.status(401).json({ message: "Name is required!" });
    }

    if(post.name.length === 0){
        return res.status(401).json({ message: "Name should not be empty!" });
    }

    if(!post.ingredients){
        return res.status(401).json({ message: "Ingredients is required!" });
    }

    if(post.ingredients.length === 0){
        return res.status(401).json({ message: "Ingredients should not be empty!" });
    }

    if(!post.price){
        return res.status(401).json({ message: "Price is required!" });
    }

    if(post.price <= 0){
        return res.status(401).json({ message: "Price should be greater than 0!" });
    }
    
    var ingredients = post.ingredients.join();
    const createdPost = await Post.create({
        name: post.name,
        description: post.description,
        ingredients: ingredients,
        price: post.price,
        UserId: auth,
        likes: 0
    })

    if (createdPost) {
        return res.json(createdPost)
    }

  return { message: "Error creating post!"}
}

async function findAll(filters) {
    const { ingredients, price } = filters

    const condition = {}

    if(ingredients){
        condition.ingredients =  { [Op.like]: `%${ingredients}%` }
    }
    if(price){
        condition.price = { [Op.lte]: price }
    }

    const result = await Post.findAll({
      where: condition,
    })
  
    return result
}

async function like(postId) {
    const foundPost = await Post.findOne({ where: { id: postId } })

    if(!foundPost) {
        return null;
    }

    await Post.update({likes : foundPost.dataValues.likes+1}, {where: { id: postId} })

    return {};
}

module.exports = {
    create,
    findAll,
    like
  }
  