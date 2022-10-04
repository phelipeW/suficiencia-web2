const user = require("../services/user.service")

async function register(req, res, next){
    try {
        const { body } = req;
        const createdUser = await user.create(body);

        if(createdUser.message){
          res.status(400).json({message: createdUser.message })
        } else {
          res.status(201).json(createdUser)
        }

      } catch (err) {
        res.status(400).json({ message: err.message })
        next(err)
      }
}

async function login(req, res, next){
    try {
        const { body } = req;
        await user.login(res, body);
      } catch (err) {
        res.status(400).json({ message: err.message })
        next(err)
      }
}

async function update(req, res, next){
  try {
    const { body, params } = req;
    
    await user.update(
      res,
      params.id, 
      body, 
      req.userId
    );
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
