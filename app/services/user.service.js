const { Op } = require('sequelize')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const db = require('../models')
const { secret } = require('../../config/general.config')
const { validEmail, validPassword } = require("../utils/helper")

const User = db.user

async function create(user) {
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
}

async function login(user) {
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
        return { message: 'Invalid Password!' }
        }
        const token = jwt.sign({ id: foundUser.id }, secret, {
        expiresIn: 86400, // 24 hours
        })
        const dataToSend = {
        ...foundUser.toJSON(),
        token,
        }
        return dataToSend;
    }
    return { message: 'User Not found!' }
}

async function update(id, userData, auth){
    if(userData.email){
        const validedEmail = validEmail(userData.email);

        if(!validedEmail){
        return { message: "Email is invalid!"};
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
        return { message: "UserType is invalid, must be greater than 0!"};
        }
    }

    if(userData.password){
        const validedPassword = validPassword(userData.password);

        if(!validedPassword){
            return { message: "Password is invalid!"};
        }
        userData.password = bcrypt.hashSync(userData.password, 8)
    }

    const authUser = await User.findOne({
        where: {
        id: auth,
        },
    })

    if(id != authUser.id){
        if(authUser.dataValues.userType != 1){
        return { message: 'Unauthorized' }
        }
    } 

    const foundUser = await User.findOne({
        where: {
        id: id,
        },
    })

    if(!foundUser){
        return { message: 'User Not found!' }
    } 

    await User.update(userData, {
        where: {
        id: id,
        },
    })

    const updatedUser = await User.findOne({
        where: {
        id: id,
        },
    })


    return updatedUser;

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
