const { Sequelize } = require('sequelize')
const db = require('../config/database')
const { DataTypes } = Sequelize

const adminin = db.define('adminin', {
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

module.exports = adminin