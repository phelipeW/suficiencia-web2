
const comment = require("../services/comment.service")
const db = require('../models')

const Post = db.post
  
async function create(req, res, next) { 
    try {
        const { body, params } = req;

        if(!body.description){        
            return res.status(401).json({ message: "Description is required!" });
        }

        if(body.description.length === 0){
            return res.status(401).json({ message: "Description should not be empty!" });
        }

        const foundPost = await Post.findOne({ where: { id: params.id}})

        if(!foundPost){
            return res.status(404).json({ message: "Post not found!" });

        }

        if(!body.rating) {
            return res.status(401).json({ message: "Rating is required!" });
        }

        if(body.rating < 1 || body.rating > 5) {
            return res.status(401).json({ message: "Rating should be greater than 0 and lesser than 6!" });
        }

        const result = await comment.create(body, params.id);

        if(result){
            return res.status(200).json(result);
        }

        return res.status(401).json({ message: "Error creating comment!"});

    } catch (err) {
        res.status(400).json({ message: err.message })
        next(err)
    }
}

async function list(req, res, next) {
    try {
        const { params} = req;

        const foundPost = await Post.findOne({ where : { id : params.id}})

        if(!foundPost) {
            return res.status(404).json({message: "Post does not exist!" });
        }


        const commentList = await comment.findAll(params.id)

        return res.json(commentList)
        
    } catch (err) {
        res.status(400).json({ message: err.message })
        next(err)
    }
}

module.exports = {
create,
list
}