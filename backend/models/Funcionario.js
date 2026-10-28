const db = require('../db/conn')
const {DataTypes} = require('sequelize')


const Funcionario = db .define('funcionario',{
    codFuncionario:{
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    email:{
        type: DataTypes.STRING(50),
        allowNull: false
    },
    senha:{
        type: DataTypes.STRING,
        allowNull: false
    }
},{
    tableName: 'funcionarios',
    timestamps: false
})

module.exports = Funcionario