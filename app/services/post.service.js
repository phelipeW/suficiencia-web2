const { Op } = require('sequelize')
const db = require('../models')
const Sequelize = require('sequelize');
const Post = db.post;
const Comment = db.comment;


async function create(post, auth) {
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
        return createdPost;
    }
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
        attributes: {
            include: [
                [Sequelize.fn('AVG', Sequelize.col('Comments.rating')), 'avgRating']
            ]
        },
        group: 'Posts.id',
        include: [
            {
            model: Comment,
            as: 'Comments',
            attributes: [],
            },
        ],
    })
  
    return result
}

async function like(postId) {
    const foundPost = await Post.findOne({ where: { id: postId } })

    if(!foundPost) {
        return null;
    }

    await Post.update({likes : foundPost.dataValues.likes+1}, {where: { id: postId} })
    const likedPost = await Post.findOne({ where: { id: postId } })
    return likedPost;
}

module.exports = {
    create,
    findAll,
    like
  }
  