const express = require('express')
const app = express()
const cors = require('cors')

const conn = require('./db/conn')
const PORT = 3000
const HOST = 'localhost'

const authMiddleware = require('./Middleware/auth.middleware')

const AuthController = require('./controller/Auth.controller')
const CargaController = require('./controller/Carga.controller')
const EntregaController = require('./controller/Entrega.controller')
const FuncionarioController = require('./controller/Funcionario.controller')
const MotoristaController = require('./controller/Motorista.controller')

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cors())

app.post('/funcionario', FuncionarioController.Cadastrar)
app.post('/login', AuthController.Login)

app.get('/', (req, res) => {
    res.status(200).json({ message: 'Aplicação rodando' })
})

app.use(authMiddleware)

app.post('/motorista', MotoristaController.Cadastrar)
app.get('/motoristas', MotoristaController.Listar)
app.get('/motorista/:id', MotoristaController.Consultar)
app.get('/motorista/busca/:nome', MotoristaController.ConsultarNome)
app.delete('/motorista/:id', MotoristaController.Apagar)
app.put('/motorista/:id', MotoristaController.Atualizar)

app.post('/carga', CargaController.Cadastrar)
app.get('/carga/:id', CargaController.Consultar)
app.get('/carga/busca/:nome', CargaController.ConsultarCod)

app.post('/entrega', EntregaController.Cadastrar)
app.get('/entregas', EntregaController.Listar)

conn.sync()

    .then(() => {
        app.listen(HOST, PORT, ()=> {
            console.log(`Aplicação rodando em http://${HOST}:${PORT}`)
        })
    })
    .catch((err)=>[
        console.error('Erro ao rodar a aplicação', err)
    ])