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
    const listing = await Listing.findById(req.params.id)

    if(!listing){
        return next(errorHandler(404, "Listing not found"))
    }

    if(req.user.id !== listing.userRef){
        return next(errorHandler(401, "You can only delete your own listings!"))
    }
    try {       

        await Listing.findByIdAndDelete(req.params.id)
        return res.status(200).json('Listing has been deleted')

    } catch (error) {
        next(error)
    }
}


export const updateListing = async(req, res, next) => {
    const listing = await Listing.findById(req.params.id)
    if(!listing){
        return next(404, "Listing not found")
    }
    if(req.user.id !== listing.userRef){
        return next(errorHandler(401, "You can only update your own listings!"))
    }

    try {
        const updatedListing = await Listing.findByIdAndUpdate(req.params.id, req.body, {new: true})
        return res.status(200).json(updatedListing)
    } catch (error) {
        next(error)
    }
}


export const getListing = async(req, res, next) => {
    try {
        const listing = await Listing.findById(req.params.id);
        if(!listing){
            return next(errorHandler(401, 'Listing not found!'))
        }
        res.status(200).json(listing)
    } catch (error) {
        next(error)
    }
}

export const search = async (req, res, next) => {
    try {
        console.log(req.query)
        const limit = (req.query.limit) || 9;
        const startIndex = (req.query.startIndex) || 0
        let offer = req.query.offer == 'true' ? true : false

        if(offer == undefined || offer === false || offer ==='false'){
            offer = {$in : [false, true]}
        }
        let furnished = req.query.furnished == 'true' ? true : false

        if(furnished === undefined || furnished === false || furnished === 'false'){
            furnished = {$in : [false, true]}
        }

        let parking = req.query.parking == 'true' ? true : false

        if(parking === undefined || parking === false || parking === 'false'){
            parking = {$in : [false, true]}
        }

        let type = req.query.type
        if(type === undefined || type === 'all'){
            type = {$in : ['sale', 'rent']}
        }

        const searchTerm = req.query.searchTerm || ''

        const sort = req.query.sort || 'createdAt'

        const order = req.query.order || 'desc'

        const listing = await Listing.find({
            name:{$regex: searchTerm, $options: 'i'},
            offer,
            furnished,
            parking,
            type,
        }).sort({[sort] : order}).limit(limit).skip(startIndex)
        return res.status(200).json(listing)
    } catch (error) {
        next(error)
    }
}