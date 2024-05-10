const Sequelize=require('sequelize')

const sequelize=require('../utils/sequelize')

const Permission=sequelize.define('permission',{
    id:{
        type:Sequelize.INTEGER,
        allowNull:false,
        primaryKey:true,
        autoIncrement:true
    },
    title:{
        type:Sequelize.STRING
    }
},{
    timestamps: false,
  })

module.exports=Permission