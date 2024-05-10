const Sequilize=require('sequelize')
const sequelize=require('../utils/sequelize')
const mainCategory=require('./mainCategory')

const subCategory=sequelize.define('subCategory',{
    id:{
        type:Sequilize.INTEGER,
        autoIncrement:true,
        allowNull:false,
        primaryKey:true
    },
    title:{
        type:Sequilize.STRING
    }
})

subCategory.belongsTo(mainCategory)

module.exports=subCategory