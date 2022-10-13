const user = require("../services/user.service")
const { validEmail, validPassword } = require("../utils/helper")
const db = require('../models')
const User = db.user

async function register(req, res, next){
    try {
        const { body } = req;

        const validedPassword = validPassword(body.password);

        if(!validedPassword){
            return { message: "Password is invalid!"};
        }

        const validedEmail = validEmail(body.email);

        if(!validedEmail){
            return { message: "Email is invalid!"};
        }

        if(body.userType <= 0 || body.userType >= 3){
            return { message: "userType is invalid, must be greater than 0 and lower than 3!" };
        }

        const createdUser = await user.create(body);

        if(createdUser.message){
            return res.status(404).json({message: createdUser.message})
        } else if(createdUser){
            return res.status(200).json(createdUser)
        }
        return res.status(400).json({ message: "Error creating use!"})


      } catch (err) {
        res.status(400).json({ message: err.message })
        next(err)
      }
}

async function login(req, res, next){
    try {
        const { body } = req;
        const result = await user.login(body);

        if(result.message){
            return res.status(401).json({
                accessToken: null,
                message: result.message,
            })
        } else {
            return res.status(200).json(result)
        }

    } catch (err) {
    res.status(400).json({ message: err.message })
    next(err)
    }
}

async function update(req, res, next){
  try {
    const { body, params } = req;
    
    const result = await user.update(
      params.id, 
      body, 
      req.userId
    );

    if(result.message){
        return res.status(400).json({
            message: result.message,
        })
    } else {
        return res.status(200).json(result)
    }
  } catch (err) {
    res.status(400).json({ message: err.message })
    next(err)
  }
}

async function remove(req, res, next) {
    try {
      const { params } = req
      const removedUser = await user.remove(params.id, req.userId)
      if (removedUser) {
        res.status(204).json({message: 'User successfully removed'})
      } else {
        res.status(400).json({ message: 'User does not exist'})
      }
    } catch (err) {
      res.status(400).json({ message: err.message })
      next(err)
    }
  }

async function get(req, res, next) {
    try {
      const userList = await user.findAll()
      res.json(userList)
    } catch (err) {
      res.status(400).json({ message: err.message })
      next(err)
    }
  }
  
  async function getOne(req, res, next) {
    try {
      const foundUser = await user.findOne(req.params.id)
  
      if(foundUser){
        res.json(foundUser)
      } else {
        res.status(404).json({message: 'User does not exist'});
      }
    } catch (err) {
      res.status(400).json({ message: err.message })
      next(err)
    }
  }

module.exports = {
    register,
    login,
    update,
    get,
    getOne,
    remove
}
