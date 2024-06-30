import User from "../modals/user.model.js"
import bcryptjs from 'bcryptjs'

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