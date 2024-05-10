const Sequelize=require('sequelize')
const sequelize=require('../utils/sequelize')

const Orders=sequelize.define('last-order',{}, {
    timestamps: false,

});

module.exports=Orders   