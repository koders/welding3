/**
* Product.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {
  tableName: 'products',

  attributes: {
    description: {
      type: 'string',
      columnName: 'desc'
    },
    inStock: 'number',
    productNumber: {
      type: 'string',
      columnName: 'pno'
    },
    totalShipped: 'number',
    categoryId: {
      type: 'bigint',
      columnName: 'category_id'
    },
    productMaterialId: {
      type: 'bigint',
      columnName: 'productMaterial_id'
    },
    productModelId: {
      type: 'bigint',
      columnName: 'productModel_id'
    },
    productSizeId: {
      type: 'bigint',
      columnName: 'productSize_id'
    }
  }
};

