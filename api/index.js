import express from 'express'
import mongoose from 'mongoose'

mongoose.connect("mongodb+srv://vaporig154:1234@cluster0.azok2y2.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
const app = express()

app.listen(3000, () => {
    console.log('server running on 3000')
})