import express from 'express'
import { createListing } from '../controller/listing.controller'

const router = express.Router

router.post('/create', createListing)

export default router