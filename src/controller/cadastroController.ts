import {Response , Request} from 'express'

type usuarioType = {
    nome : string ,
    email : string ,
    senha : string ,
    telefone : string
}

export default class CadastroController {

    static salvarUsuario(usuario : usuarioType , res : Response){
        console.log(usuario)
        res.status(201).json(usuario)
    }
}