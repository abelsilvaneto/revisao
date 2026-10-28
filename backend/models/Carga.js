const db = require('../db/conn')
const {DataTypes} = require('sequelize')

const Carga = db .define('carga',{
    codCarga:{
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    descricao:{
        type: DataTypes.STRING(50),
        allowNull: false
    },
    peso:{
        type: DataTypes.DECIMAL(10,2),
        allowNull: false
    },
    volume:{
        type: DataTypes.DECIMAL(10,2),
        allowNull: false
    },
    codRastreio:{
        type: DataTypes.INTEGER,
        allowNull: false
    },
    idMotorista:{
        type: DataTypes.INTEGER,
        references:{
            model: 'motoristas',
            key: 'codMotorista'
        },
        allowNull: false
    }
},{
    tableName: 'cargas',
    timestamps: false
})

module.exports = Carga