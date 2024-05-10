const Sequelize=require('sequelize')
const sequelize=require('../utils/sequelize')

const User=require('./user')
const Product=require('./product')
const Favorite=sequelize.define('favorite',{
    id:{
        type:Sequelize.INTEGER,
        autoIncrement:true,
        allowNull:false,
        primaryKey:true
    },
    // product:{
    //     type:Sequelize.INTEGER,
    //     allowNull:false
    // },

})

Favorite.belongsTo(Product)
Favorite.belongsTo(User)

module.exports=Favorite