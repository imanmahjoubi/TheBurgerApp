var orm = require('../config/orm.js');

var burger = {
    //Create
    create: function(colsArray, valsArray, cb) {
        orm.create('burgers', colsArray, valsArray, function(result) {
            cb(result);
        });
    },

    //Read
    all: function(cb) {
        orm.all('burgers', function(result) {
            cb(result);
        });
    },

    //Update
    update: function(colValObj, condition, cb) {
        orm.update('burgers', colValObj, condition, function(result) {
            cb(result);
        });
    },

    //Delete
    delete: function(condition, cb) {
        orm.delete('burgers', condition, function(result) {
            cb(result);
        });
    }
};

module.exports = burger;