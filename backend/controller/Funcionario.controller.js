const Funcionario = require('../models/Funcionario')
const CryptoJS = require('crypto-js')
const CHAVE_SEGREDO = 'chave_baixar'

const Cadastrar = async (req,res)=>{
    const valor = req.body

    if(!valor.email || !valor.senha){
        return res.status(401).json({message: 'Coloque todos os valores para continuar'})
    }
    try{
        const SenhaCrypto = CryptoJS.AES.encrypt(valor.senha, CHAVE_SEGREDO).toString()

        await Funcionario.create({
            email: valor.email,
            senha: SenhaCrypto
        })
        res.status(201).json({message: 'Funcionario cadastrado'})
    }catch(err){
        res.status(500).json({message:'Erro ao realizar a operação'})
        console.error('Erro ao realizar a operação',err)
    }
}

module.exports = {Cadastrar}