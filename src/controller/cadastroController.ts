import {Response , Request} from 'express'
import bcrypt from 'bcrypt'
import CadastroModel from '../models/cadastroModel'

export type usuarioType = {
    nome : string ,
    email : string ,
    senha : string ,
    telefone : string
}

export default class CadastroController {

    static salvarUsuario(usuario : usuarioType , res : Response){

        const salt = bcrypt.genSaltSync(10)
        const senha = bcrypt.hashSync(usuario.senha , salt)
        usuario.senha = senha 

        try {
           const resposta =  CadastroModel.salvarUsuario(usuario)
           res.status(201).json(resposta)
        }catch{
            res.status(500).json("Erro do Servidor")
        }
    }
}