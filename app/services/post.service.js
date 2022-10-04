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
    console.log(ingredients)
    const createdPost = await Post.create({
        name: post.name,
        description: post.description,
        ingredients: ingredients,
        price: post.price,
        UserId: auth
    })

    if (createdPost) {
        return res.json(createdPost)
    }

  return { message: "Error creating post!"}
}

async function findAll(filters) {
    const { ingredients, price } = filters

    let condition = {}

    if(ingredients){
        condition.ingredients =  { [Op.like]: `%${ingredients}%` }
    }
    if(price){
        console.log('entrou')
        condition.price = { [Op.lte]: price }
    }

    if(Object.keys(condition).length === 0){
        condition = null;
    }

    console.log(condition)
    const result = await Post.findAll({
      where: condition,
    })
  
    return result
}

module.exports = {
    create,
    findAll,
  }
  