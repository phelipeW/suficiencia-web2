const db = require('../models')

const Comment = db.comment
const Post = db.post

async function create(comment, postId) {
    const createdComment = await Comment.create({
        description: comment.description,
        rating: comment.rating,
        PostId: postId,
    })

    const foundPost = await Post.findOne({ where: { id: postId}})

    if (createdComment) {
        await Post.update({rating : foundPost.dataValues.likes+1}, {where: { id: postId} })
        return createdComment
    }
}

async function findAll(postId) {
    const foundComments = await Comment.findAll({ where: { PostId: postId } })

    return foundComments;
}

module.exports = {
    create,
    findAll
}