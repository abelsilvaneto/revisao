const Funcionario = require('../models/Funcionario')
const CryptoJS = require('crypto-js')
const CHAVE_SEGREDO = 'chave_baixar'

const Login = async (req,res)=>{
    const valor = req.body

    if(!valor.email || !valor.senha){
        return res.status(401).json({message: 'Coloque todos os valores para continuar'})
    }
    try{

        const funcionario = await Funcionario.findOne({where: {email: valor.email}})
        if(!funcionario){
            return res.status(400).json({message: 'Funcionario não encontrado'})
        }
        const SenhaCrypto = CryptoJS.AES.encrypt(valor.senha, CHAVE_SEGREDO).toString()

        if(SenhaCrypto !== funcionario.senha){
            return res.status(400).json({Message: 'Email ou senha errada'})
        }

        const TempoMs = 180 * 60 * 1000
        const TempoExpira = Date.now() + TempoMs

        const payload ={
            codFuncionario: funcionario.codFuncionario,
            email: funcionario.email,
            expiraEm : TempoExpira
        }

        const token = CryptoJS.AES.encrypt(JSON.stringify(payload),CHAVE_SEGREDO).toString()

        res.status(201).json({message: 'Funcionario Logado',
            email: valor.email,
            token: token
        })
    }catch(err){
        res.status(500).json({message:'Erro ao realizar a operação'})
        console.error('Erro ao realizar a operação',err)
    }
}

module.exports = {Login}