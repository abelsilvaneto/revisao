const Motorista = require('../models/Motorista')
const Carga = require('../models/Carga')

const Cadastrar = async (req, res) => {
    const valor = req.body

    if (!valor.descricao || !valor.peso || !valor.volume || !valor.codRastreio || !valor.idMotorista) {
        return res.status(401).json({ message: 'Coloque todos os valores para continuar' })
    }

    try {
       const motorista = await Motorista.findByPk(valor.idMotorista)
       if(!motorista){
        return res.status(400).json({message: 'Motorista não encontrado'})
       }

        await Motorista.create({
            descricao: valor.descricao,
            peso: valor.peso,
            volume: valor.volume,
            codRastreio: valor.codRastreio,
            idMotorista: valor.codRastreio
        })
        res.status(201).json({ message: 'Carga cadastrado' })
    } catch (err) {
        res.status(500).json({ message: 'Erro ao realizar a operação' })
        console.error('Erro ao realizar a operação', err)
    }
}

const Consultar = async (req, res) => {
    const id = req.params.id

    try {
        const carga = await Carga.findByPk(id)
        if (!carga) {
            return res.status(400).json({ message: 'Carga não encontrada' })
        }

        res.status(201).json(carga)
    } catch (err) {
        res.status(500).json({ message: 'Erro ao realizar a operação' })
        console.error('Erro ao realizar a operação', err)
    }
}

const ConsultarCod = async (req, res) => {
    const codRastreio = req.params.codRastreio

    try {
        const carga = await Carga.findOne({ where: { codRastreio: codRastreio } })
        if (!carga) {
            return res.status(400).json({ message: 'Carga não encontrado' })
        }

        res.status(201).json(carga)
    } catch (err) {
        res.status(500).json({ message: 'Erro ao realizar a operação' })
        console.error('Erro ao realizar a operação', err)
    }
}

module.exports = { Cadastrar, Consultar, ConsultarCod}