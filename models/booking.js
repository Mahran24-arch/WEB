const { Sequelize } = require('sequelize')
const db = require('../config/database')
const { DataTypes } = Sequelize

const booking = db.define('booking', {
    id : {
        type: DataTypes.INTEGER,
        primaryKey : true,
        autoIncrement : true
    }, 
    tanggal_checkin : {
        type: DataTypes.DATE,
        allowNull: false,
    },
    tanggal_checkout : {
        type: DataTypes.DATE,
        allowNull: false,
    },
    type_room : {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email : {
        type: DataTypes.STRING,
        allowNull: false,
    },
    phone : {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    nama : {
        type: DataTypes.STRING,
        allowNull: false,
    },
})

module.exports = booking