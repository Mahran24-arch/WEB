const { Sequelize } = require('sequelize')
const db = require('../config/database')
const { DataTypes } = Sequelize

const user = db.define('user', {
    id : {
        type: DataTypes.INTEGER,
        primaryKey : true,
        autoIncrement : true
    },
    email : {
        type: DataTypes.STRING,
        allowNull: false,
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

module.exports = user