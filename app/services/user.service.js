const { Op } = require('sequelize')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const db = require('../models')
const { secret } = require('../../config/general.config')
const { validEmail } = require("../utils/helper")

const User = db.User

async function create(user) {

  const validedEmail = validEmail(user.email);

  if(!validedEmail){
    return { message: "Email is invalid"};
  }

  if(user.userType <= 0 || user.userType >= 3){
    return { message: "userType is invalid, must be greater than 0 and lower than 3" };
  }

   const foundUser = await User.findOne({
    where: {
      email: user.email
    }
  })

  if(foundUser){
    return { message: "Email is already in use!"};
  }

  const createdUser = await User.create({
    email: user.email,
    password: bcrypt.hashSync(user.password, 8),
    name: user.name,
    userType: user.userType,
  })

  if (createdUser) {
    return createdUser
  }

  return { message: "Error creating use"}
}

async function login(res, user) {
  const foundUser = await User.findOne({
    where: {
      email: user.email,
    },
  })

  if (foundUser) {
    const passwordIsValid = bcrypt.compareSync(
      user.password,
      foundUser.password
    )
    if (!passwordIsValid) {
      return res.status(401).json({
        accessToken: null,
        message: 'Invalid Password!',
      })
    }
    const token = jwt.sign({ id: foundUser.id }, secret, {
      expiresIn: 86400, // 24 hours
    })
    const dataToSend = {
      ...foundUser.toJSON(),
      token,
    }
    return res.status(200).json(dataToSend)
  }
  return res.status(404).json({ message: 'User Not found.' })
}

async function update(res, id, userData, auth){
  if(userData.email){
    const validedEmail = validEmail(userData.email);

    if(!validedEmail){
      return res.status(400).json({ message: "Email is invalid"});
    }
    const emailUser = await User.findOne({
      where: {
        email: userData.email,
        id: { [Op.ne]: id }
      }
    })
  
    if(emailUser){
      return { message: "Email is already in use!"};
    }
  }
  
  if(userData.userType){
    if(userData.userType <= 0){
      return res.status(400).json({ message: "UserType is invalid, must be greater than 0"});
    }
  }

  if(userData.password){
    userData.password = bcrypt.hashSync(userData.password, 8)
  }

  const authUser = await User.findOne({
    where: {
      id: auth,
    },
  })

  if(id != authUser.id){
    console.log('authUser.dataValues',authUser.dataValues)
    if(authUser.dataValues.userType != 1){
      return res.status(401).json({ message: 'Unauthorized' })
    }
  } 

  const foundUser = await User.findOne({
    where: {
      id: id,
    },
  })

  if(!foundUser){
    return res.status(404).json({ message: 'User Not found.' })
  } 

  const updatedUser = await User.update(userData, {
    where: {
      id: id,
    },
  })

  return res.status(204).json(updatedUser);

}

async function remove(id) {
    const authUser = await User.findOne({
        where: {
          id: auth,
        },
      })

    if(authUser.userType === 1){
    const deletedUser = await User.destroy({
      where: { id },
    })

    return deletedUser
    }

    return false;
  
}

async function findOne(id) {
    const result = await User.findByPk(id)
  
    return result
}

async function findAll() {
  
    const result = await User.findAll()
    
    return result
}


module.exports = {
  create,
  login,
  update,
  remove,
  findAll,
  findOne,
}
