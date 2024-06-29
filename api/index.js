import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
mongoose
.connect(process.env.MONGO)
.then(() => {
    console.log("Connected to DB")
})
.catch((err) => {
    console.log(err)
})
const app = express()

app.listen(3000, () => {
    console.log('server running on 3000')
})