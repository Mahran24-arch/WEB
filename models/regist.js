const { Sequelize } = require('sequelize')
const db = require('../config/database')
const { DataTypes } = Sequelize

const regist = db.define('regist', {
    id : {
        type: DataTypes.INTEGER,
        primaryKey : true,
        autoIncrement : true
    },
    username : {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email : {
        type: DataTypes.STRING,
        allowNull: false,
    },
    password : {
        type: DataTypes.STRING,
        allowNull: false,
    },
})

module.exports = regist