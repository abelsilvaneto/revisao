const Funcionario = require('./Funcionario')
const Motorista = require('./Motorista')
const Carga = require('./Carga')
const Entrega = require('./Entrega')

Motorista.hasMany(Carga, {
    as: 'CargaMotorista',
    foreignKey: 'idMotorista',
    onDelete: 'CASCADE'
})

Carga.belongsTo(Motorista, {
    as: 'MotoristaCarga',
    foreignKey: 'idMotorista',
    allowNull: false
})

Carga.hasMany(Entrega, {
    as: 'CargaEntrega',
    foreignKey: 'idCarga',
    onDelete: 'CASCADE'
})

Entrega.belongsTo(Carga, {
    as: 'EntregaCarga',
    foreignKey: 'idCarga',
    allowNull: false
})

module.exports = { Funcionario, Carga, Motorista, Entrega  }