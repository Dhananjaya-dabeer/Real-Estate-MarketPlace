import express from 'express'
import { createListing, delteListing } from '../controller/listing.controller.js'
import { verifyToken } from '../utils/verifyUser.js'

const router = express.Router()

router.post('/create', verifyToken ,createListing)
router.delete('/delete/:id', verifyToken ,delteListing)

export default router