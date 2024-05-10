const Sequelize=require('sequelize')
const sequelize=require('../utils/sequelize')

const User=sequelize.define('user', {
    id:{
        type:Sequelize.INTEGER,
        autoIncrement:true,
        allowNull:false,
        primaryKey:true,
    },
    userName:{
        type:Sequelize.STRING,
        allowNull:false,
        trim:true,
        unique:true
    },
    email:{
        type:Sequelize.STRING,
        allowNull:false,
        trim:true,
        unique:true
    },
    password:{
        type:Sequelize.TEXT,
        allowNull:false,
        get:function(){
            if(this.getDataValue('password')){
                return JSON.parse(this.getDataValue('password'))
            }else{
                return ''
            }
        },
        set:function(value){
            this.setDataValue('password',JSON.stringify(value))
        }
    },
    age:{
        type:Sequelize.INTEGER
    },
    phone:{
        type:Sequelize.STRING,
    },
    address:{
        type:Sequelize.STRING
    },
    photo:{
        type:Sequelize.STRING
    }
});


module.exports=User