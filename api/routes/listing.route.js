import express from 'express'
import { createListing, delteListing, updateListing, getListing, search } from '../controller/listing.controller.js'
import { verifyToken } from '../utils/verifyUser.js'

const router = express.Router()

router.post('/create', verifyToken ,createListing)
router.delete('/delete/:id', verifyToken ,delteListing)
router.post('/update/:id', verifyToken ,updateListing)
router.get('/get/:id', getListing)
router.get('/get', search)
export default router