import Listing from "../modals/listing.model.js"
import { errorHandler } from "../utils/error.js"

export const createListing = async (req, res, next) => {
    try {
        const listing = await Listing.create(req.body)
        return res.status(201).json(listing)
    } catch (error) {
        next(error)
    }
}

export const delteListing = async (req, res, next) => {
    
    try {
        const listing = await Listing.findById(req.params.id)
        if(req.user.id !== listing.userRef){
            return next(errorHandler(401, "You can only delete your own listings!"))
        }

        if(!listing){
            return next(errorHandler(404, "Listing not found"))
        }

        await Listing.findByIdAndDelete(req.params.id)
        return res.status(200).json('Listing has been deleted')
    } catch (error) {
        next(error)
    }
}