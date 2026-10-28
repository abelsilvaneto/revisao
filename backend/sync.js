const conn = require('./db/conn')
const { Funcionario, Carga, Motorista, Entrega  }= require('./models/rel')

async function syncDataBase() {
    try {
        await conn.sync({ force: true })
        console.log('Realizando a conexão com o banco')
    } catch (err) {
        console.error('Erro ao sincronizar o banco')
    } finally {
        await conn.close()
        console.log('fechando a conexão com o banco')
    }
}

syncDataBase()