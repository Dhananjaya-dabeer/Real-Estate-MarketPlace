import User from "../modals/user.model.js"
import bcryptjs from 'bcryptjs'

export const signup = async(req, res) => {
      const {username, email, password} = req.body
            const hashedPassword =  bcryptjs.hashSync(password, 10)
            const userData = new User({username, email, password:hashedPassword})
      try {
            await userData.save()
            res.status(201).send('User created successfully!')
      } catch (error) {
            res.status(500).json(error)
      }
      
}