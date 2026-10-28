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

const Consultar = async (req, res) => {
    const id = req.params.id

    try {
        const motorista = await Motorista.findByPk(id)
        if (!motorista) {
            return res.status(400).json({ message: 'Motorista não encontrado' })
        }

        const bytesCnh = CryptoJS.AES.decrypt(valor.cnh, CHAVE_SEGREDO)
        const CnhDescrypto = bytesCnh.toString(CryptoJS.enc.Utf8)
        const bytesCpf = CryptoJS.AES.decrypt(valor.cpf, CHAVE_SEGREDO)
        const CpfDescrypto = bytesCpf.toString(CryptoJS.enc.Utf8)

        res.status(201).json({
            codMotorista: motorista.codMotorista,
            nome: motorista.nome,
            cnh: CnhDescrypto,
            cpf: CpfDescrypto,
            telefone: motorista.telefone
        })
    } catch (err) {
        res.status(500).json({ message: 'Erro ao realizar a operação' })
        console.error('Erro ao realizar a operação', err)
    }
}

const ConsultarNome = async (req, res) => {
    const nome = req.params.nome

    try {
        const motorista = await Motorista.findOne({ where: { nome: nome } })
        if (!motorista) {
            return res.status(400).json({ message: 'Motorista não encontrado' })
        }

        const bytesCnh = CryptoJS.AES.decrypt(valor.cnh, CHAVE_SEGREDO)
        const CnhDescrypto = bytesCnh.toString(CryptoJS.enc.Utf8)
        const bytesCpf = CryptoJS.AES.decrypt(valor.cpf, CHAVE_SEGREDO)
        const CpfDescrypto = bytesCpf.toString(CryptoJS.enc.Utf8)

        res.status(201).json({
            codMotorista: motorista.codMotorista,
            nome: motorista.nome,
            cnh: CnhDescrypto,
            cpf: CpfDescrypto,
            telefone: motorista.telefone
        })
    } catch (err) {
        res.status(500).json({ message: 'Erro ao realizar a operação' })
        console.error('Erro ao realizar a operação', err)
    }
}

const Apagar = async (req, res) => {
    const id = req.params.id

    try {
        const motorista = await Motorista.findByPk(id)
        if (!motorista) {
            return res.status(400).json({ message: 'Motorista não encontrado' })
        }

        res.status(201).json({ message: 'Dados apagados com sucesso' })
    } catch (err) {
        res.status(500).json({ message: 'Erro ao realizar a operação' })
        console.error('Erro ao realizar a operação', err)
    }
}

const Atualizar = async (req, res) => {
    const id = req.params.id
    const valor = req.body

    if (!valor.nome || !valor.cnh || !valor.cpf || !valor.telefone) {
        return res.status(401).json({ message: 'Coloque todos os valores para continuar' })
    }

    try {
        const motorista = await Motorista.findByPk(id)
        if (!motorista) {
            return res.status(400).json({ message: 'Motorista não encontrado' })
        }

        const valor2 = { ...valor }

        if (valor.cpf) {
            if (valor.cpf.lenght !== 11) {
                return res.status(401).json({ message: 'O cpf deve ter 11 casas' })
            }
            valor2.cpf = CryptoJS.AES.encrypt(valor.cpf, CHAVE_SEGREDO).toString()
        }

        if(valor.cnh){
            valor2.cnh = CryptoJS.AES.encrypt(valor.cnh, CHAVE_SEGREDO).toString
        }

        await Motorista.update(valor2, {where: {codMotorista: id}})
        res.status(201).json({message: 'Dados Atualizado com sucesso'})
    } catch (err) {
        res.status(500).json({ message: 'Erro ao realizar a operação' })
        console.error('Erro ao realizar a operação', err)
    }
}

const Listar = async(req,res)=>{
     try{
    
     }catch(err){

     }
}
module.exports = { Cadastrar, Consultar, ConsultarNome, Atualizar, Apagar, Listar }