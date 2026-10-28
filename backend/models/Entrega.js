const db = require('../db/conn')
const {DataTypes} = require('sequelize')

const Entrega = db .define('entrega',{
    codEntrega:{
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    cidadeDestino:{
        type: DataTypes.STRING(50),
        allowNull: false
    },
    status:{
        type: DataTypes.ENUM('ENTREGUE','TRANSITO'),
        allowNull: false
    },
    data:{
        type: DataTypes.DATEONLY,
        allowNull: false
    },
    hora:{
        type: DataTypes.TIME,
        allowNull: false
    },
    idCarga:{
        type: DataTypes.INTEGER,
        references:{
            model: 'cargas',
            key: 'codCarga'
        },
        allowNull: false
    }
},{
    tableName: 'entregas',
    timestamps: false
})

module.exports = Entrega