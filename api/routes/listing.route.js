import express from 'express'
import { createListing, delteListing, updateListing } from '../controller/listing.controller.js'
import { verifyToken } from '../utils/verifyUser.js'

const router = express.Router()

router.post('/create', verifyToken ,createListing)
router.delete('/delete/:id', verifyToken ,delteListing)
router.delete('/update/:id', verifyToken ,updateListing)

export default router