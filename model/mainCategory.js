const Sequelize=require('sequelize')
const sequelize=require('../utils/sequelize')

const Category=sequelize.define('category',{
    id:{
        type:Sequelize.INTEGER,
        autoIncrement:true,
        allowNull:false,
        primaryKey:true
    },
    title:{
        type:Sequelize.STRING,
    }
})

module.exports=Category