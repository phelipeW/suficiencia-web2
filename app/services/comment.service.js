const db = require('../models')

const Comment = db.comment
const Post = db.post

async function create(res, comment, postId) {
    if(!comment.description){        
        return res.status(401).json({ message: "Description is required!" });
    }

    if(comment.description.length === 0){
        return res.status(401).json({ message: "Description should not be empty!" });
    }

    const foundPost = await Post.findOne({ where: { id: postId}})
    
    if(!foundPost){
        return res.status(404).json({ message: "Post not found!" });

    }

    const createdComment = await Comment.create({
        description: comment.description,
        PostId: postId,
    })

    if (createdComment) {
        return res.json(createdComment)
    }

  return { message: "Error creating comment!"}
}

async function findAll(postId) {
    const foundPost = await Post.findOne({ where : { id : postId}})

    if(!foundPost) {
        return { message: "Post does not exist!" };
    }
    const foundComments = await Comment.findAll({ where: { PostId: postId } })

    return foundComments;
}

module.exports = {
    create,
    findAll
}