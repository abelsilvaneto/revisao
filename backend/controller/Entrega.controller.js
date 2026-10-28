const Motorista = require('../models/Motorista')
const CryptoJS = require('crypto-js')
const CHAVE_SEGREDO = 'chave_baixar'

const Cadastrar = async (req, res) => {
    const valor = req.body

    if (!valor.nome || !valor.cnh || !valor.cpf || !valor.telefone) {
        return res.status(401).json({ message: 'Coloque todos os valores para continuar' })
    }

    if (valor.cpf.lenght !== 11) {
        return res.status(401).json({ message: 'O cpf deve ter 11 casas' })
    }
    try {
        const CnhCrypto = CryptoJS.AES.encrypt(valor.cnh, CHAVE_SEGREDO).toString()
        const CpfCrypto = CryptoJS.AES.encrypt(valor.cpf, CHAVE_SEGREDO).toString()

        await Motorista.create({
            nome: valor.nome,
            cnh: CnhCrypto,
            cpf: CpfCrypto,
            telefone: valor.telefone
        })
        res.status(201).json({ message: 'Motorista cadastrado' })
    } catch (err) {
        res.status(500).json({ message: 'Erro ao realizar a operação' })
        console.error('Erro ao realizar a operação', err)
    }
}

 const Listar = async(req,res)=>{

 }

module.exports = { Cadastrar, Listar }