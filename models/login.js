const { Sequelize } = require('sequelize')
const db = require('../config/database')
const { DataTypes } = Sequelize

const login = db.define('login', {
    id : {
        type: DataTypes.INTEGER,
        primaryKey : true,
        autoIncrement : true
    },
    username : {
        type: DataTypes.STRING,
        allowNull: false,
    },
    password : {
        type: DataTypes.STRING,
        allowNull: false,
    },
})

module.exports = login