const Sequelize = require('sequelize')

const db = new Sequelize('checkin_hotels', 'root', '' , {
    host: 'localhost',
    dialect: 'mysql'
})

module.exports = db