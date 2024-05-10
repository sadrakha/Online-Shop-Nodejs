const Sequelize=require('sequelize')

const sequelize=require('../utils/sequelize')

const rolePermission=sequelize.define('rolePermission',{},{
    timestamps: false,
  })

module.exports=rolePermission