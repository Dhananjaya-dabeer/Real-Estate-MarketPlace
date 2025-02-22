import Listing from "../modals/listing.model.js"
import User from "../modals/user.model.js"
import { errorHandler } from "../utils/error.js"
import bcryptjs from 'bcryptjs'
export const test = (req,res) => {
        res.send({
            message: 'Hello World!'
        })
}

export const updateUser = async (req, res, next) => {
    if(req.user.id !== req.params.id) return next(errorHandler(401, "You can only update your own account!"))
    
    try {
        if(req.body.password){
            req.body.password = bcryptjs.hashSync(req.body.password, 10)
        }
        const updateUser = await User.findByIdAndUpdate(req.params.id, {
            $set:{
                username:req.body.username,
                email:req.body.email,
                password:req.body.password,
                avatar:req.body.avatar
            }
        }, {new:true})
        const {password, ...rest} = updateUser._doc
        res.status(200).json(rest)

    } catch (error) {
        next(error)
    }
}

export const deleteUser = async(req, res, next) => {
    if(req.user.id !== req.params.id) return next(errorHandler(401, "You can delete your own account"))
        try {
            await User.findByIdAndDelete(req.params.id)
            res.clearCookie('access_token').status(200).json('User has been deletetd')
        } catch (error) {
            next(error)
        }
}

export const getUserListings = async (req, res, next) => {
    
    if(req.user.id === req.params.id){
        try {
            let listings = await Listing.find({userRef:req.params.id})
            return res.status(200).json(listings)
        } catch (error) {
            next(error)
        }
    }else{
        next(errorHandler(401, 'You can only view your own listings'))
    }
}

export const getUser = async (req, res, next) => {
    try {
        const user = await User.findById(req.params.id)
        if(!user) {
            next(errorHandler(404, 'User not found!'))
            return
        }
       const  {password, ...rest} = user._doc
        res.status(200).json(rest)
    } catch (error) {
        next(error)
    }
}