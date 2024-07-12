const ecommerceService = require('../services/ecommerceService')
// const cacheService = require('../services/cacheService')

exports.getProducts = async(req, res) => {
    const {categoryname} = req.params;
    const {n, page, sort, order} = req.query

    try{
        const products = await ecommerceService.getTopProducts(categoryname, n, page, sort, order)
        res.status(200).json(products);
    }
    catch(error)
    {
        res.status(500).json({error: error.message})
    }
}

exports.getProductDetails = async(req, res) => {
    const {id} = req.params

    try{
        const product = await ecommerceService.getProductById(id)
        res.status(200).json(products);
    }
    catch(error)
    {
        res.status(500).json({error: error.message})
    }
}