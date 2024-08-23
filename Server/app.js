const express = require('express')
const cors = require('cors')
const connectDB = require('./config/DB')
const userRoutes = require('./routes/UserRoutes')
const productRoutes = require('./routes/ProductRoutes')
const categoriesRoutes = require('./routes/CategoriesRoutes')



require('dotenv').config()

const app = express()
const port = process.env.PORT
const url = process.env.MONGOO_URI

app.use(express.json())
app.use(cors({
    origin : '*'
}))


app.use('/api/v1/user',userRoutes)
app.use('/api/v1/product',productRoutes)
app.use('/api/v1/categories',categoriesRoutes)




const start = ()=>{
    connectDB(url)
    .then(()=>{
        app.listen(port , ()=>{
            console.log(`app is listening to the port ${port}`)
        })
    })
    .catch((err)=>{
        console.error(err)
    })
}

start()