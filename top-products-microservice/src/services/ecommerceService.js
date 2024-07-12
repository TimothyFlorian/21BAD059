const axios = require('axios');
const { v4: uuidv4 } = require('uuid');
const cacheService = require('./cacheService');

const BASE_URL = 'http://20.244.56.144/test';

const companies = ["AMZ", "FLP", "SNP", "MYN", "AZO"];

const getTopProducts = async (categoryname, n = 10, page = 1, minprice, maxprice, sort, order) => {
  try {
    const cacheKey = `${categoryname}-${n}-${page}-${minprice}-${maxprice}-${sort}-${order}`;
    let products = cacheService.get(cacheKey);

    if (!products) {
      const allProducts = [];

      for (const company of companies) {
        const response = await axios.get(`${BASE_URL}/companies/${company}/categories/${categoryname}/products`, {
          params: {
            top: n,
            minprice,
            maxprice
          }
        });
        allProducts.push(...response.data);
      }

      products = allProducts
        .map(product => ({ ...product, id: uuidv4() }))
        .sort((a, b) => {
          if (!sort) return 0;
          const valueA = a[sort];
          const valueB = b[sort];
          if (order === 'desc') return valueB - valueA;
          return valueA - valueB;
        })
        .slice((page - 1) * n, page * n);

      cacheService.set(cacheKey, products);
    }

    return products;
  } catch (error) {
    throw new Error('Failed to fetch products');
  }
};

const getProductById = async (id) => {
  try {
    for (const company of companies) {
      const response = await axios.get(`${BASE_URL}/companies/${company}/products/${id}`);
      if (response.data) {
        return response.data;
      }
    }
    throw new Error('Product not found');
  } catch (error) {
    throw new Error('Failed to fetch product details');
  }
};

module.exports = {
  getTopProducts,
  getProductById
};
