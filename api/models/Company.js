/**
* Company.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {
  tableName: 'companies',

  attributes: {
    name: {
      type: 'string',
      columnName: 'name'
    },
    orderNumber: {
      type: 'number',
      columnName: 'onr'
    },
    address: {
      type: 'string',
      columnName: 'address'
    },
    properties: {
      type: 'string',
      columnName: 'properties'
    }
  }
};

