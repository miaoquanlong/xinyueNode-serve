
var express = require('express');
var router = express.Router();
// var fs = require('fs');
let mysql = require('mysql')

const $dbConfig = {
    host: "localhost",
    user: "xy",
    password: "1qazxsw2",
    port: "3306",
    database: "xinyue2"
}

var pool = mysql.createPool($dbConfig);

module.exports = pool;
