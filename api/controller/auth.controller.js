import User from "../modals/user.model.js"
import bcryptjs from 'bcryptjs'
import { errorHandler } from "../utils/error.js"
import jwt from 'jsonwebtoken'

export const signup = async(req, res, next) => {
      const {username, email, password} = req.body
            if(!username || !email || !password){
               return   res.status(400).json({
                        statusCode:400,
                        success:false,
                        message:'Bad Request! All fields are Required'
                  })
                  
            }
            const hashedPassword =  bcryptjs.hashSync(password, 10)
            const userData = new User({username, email, password:hashedPassword})
      try {
            await userData.save()
            res.status(201).json('User created successfully!')
      } catch (error) {
           next(error)
      }
      
}

export const signin = async(req, res, next) => {
      const {email, password} = req.body
      try {
            const validUser = await User.findOne({email})
            if(!validUser) return next(errorHandler(400, 'User not found!'))
            const validPassword = bcryptjs.compareSync(password, validUser.password)
            if(!validPassword) return next(errorHandler(401, 'Either email or password is wrong'))
            const token = jwt.sign({id:validUser._id}, process.env.JWT_SECRET)
            const {password:code, ...rest} = validUser._doc
            res.cookie('access_token', token, {httpOnly: true}).status(200).json(rest)
            
      } catch (error) {
            next(error)
      }
}