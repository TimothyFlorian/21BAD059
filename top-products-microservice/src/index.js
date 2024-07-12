const express = require('express')
const app = express()

const port = process.env.PORT || 3000

const productsRouter = require("./routes/products")
const categoriesRouter = require("./routes/categories")

app.use('/categories', categoriesRouter)
app.use('/products', productsRouter)

app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})