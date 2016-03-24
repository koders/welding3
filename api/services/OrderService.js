module.exports = {
  getOrders: function(next) {
    Order.find().exec(function(err, orders) {
      if(err) throw err;
      next(orders);
    });
  },
  addOrder: function(orderVal, next) {
    Order.create({value: orderVal}).exec(function(err, order) {
      if(err) throw err;
      next(order);
    });
  },
  removeOrder: function(orderVal, next) {
    Order.destroy({value: orderVal}).exec(function(err, order) {
      if(err) throw err;
      next(order);
    });
  }
};
