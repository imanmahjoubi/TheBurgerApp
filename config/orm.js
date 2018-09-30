var connection = require('./connection.js');

function printQuestionMarks(num) {
    var array = [];
    console.log(num);
    for (var i = 0; i < num; i++) {
        array.push('?');
    }
    return array.toString();
}

function objToSql(obj) {
    var array = [];
    for (key in obj) {
        var value = obj[key];
        if(Object.hasOwnProperty.call(obj, key)) {
            if (typeof value === 'string' && value.indexOf(' ') >= 0) {
                value = "'" + value + "'";
            }
            array.push(key + "=" + value);
        }
    }
    return array.toString();
}

var orm = {
    //Create
    //INSERT INTO table_name (col1, [col2]...) VALUES (val1, [val2]...)
    create: function(table, colsArray, valsArray, cb) {
        var sql = "INSERT INTO " + table + " (";
        sql += colsArray.toString() + ") VALUES (";
        console.log(printQuestionMarks(valsArray.length));
        sql += printQuestionMarks(valsArray.length) + ")";
        console.log(sql);
        connection.query(sql, valsArray, function(error, data) {
            if (error) throw error;
            cb(data);
        });
    },

    //Read
    all: function(table, cb) {
        var sql = 'SELECT * FROM ' + table;
        connection.query(sql, function(error, data){
            if (error) throw error;
            if (!data) {
                console.log('no data to return');
            } else {
                cb(data);
            }
        });
    },

    //Update
    //UPDATE table_name SET col1=val1 [col2=val2, col3=val3...] WHERE condition
    update: function(table, colValObj, condition, cb) {
        var sql = 'UPDATE ' + table + ' SET ';
        sql += objToSql(colValObj) + " WHERE " + condition;
        connection.query(sql, function(error, data) {
            if (error) throw error;
            cb(data);
        });
    },

    //Delete
    //DELETE FROM table_name WHERE condition
    delete: function(table, condition, cb) {
        var sql = 'DELETE FROM ' + table + ' WHERE ';
        sql += condition;
        connection.query(sql, function(error, data) {
            if (error) throw error;
            cb(data);
        });
    }
};

module.exports = orm;   