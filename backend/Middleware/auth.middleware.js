const CryptoJS = require('crypto-js')
const CHAVE_SEGREDO = 'chave_baixar'

function authMiddleware(req, res, next) {
    const token = req.headers['authorization']
    console.log(token)

    if (!token) {
        return res.status(400).json({ message: 'Token não fornecido' })
    }
    try {
        const bytes = CryptoJS.AES.decrypt(token, CHAVE_SEGREDO)
        const dadosDescrypto = bytes.toString(CryptoJS.enc.Utf8)

        if (!dadosDescrypto) {
            return res.status(400).json({ message: 'Token invalido' })
        }

        const payload = JSON.parse(dadosDescrypto)

        if (Date.now() > payload.expiraEm) {
            return res.status(400).json({ message: 'Tempo expirado' })
        }

        next()
    } catch (err) {
        return res.status(500).json({message: 'Erro ao realizar a operação'})
    }

}

module.exports = authMiddleware