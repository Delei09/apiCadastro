import {Response , Request} from 'express'
import bcrypt from 'bcrypt'
import CadastroModel from '../models/cadastroModel'

export type usuarioType = {
    nome : string ,
    email : string ,
    senha : string ,
    telefone : string
}

export type atualizarUsuarioType = {
    nome? : string ,
    email? : string ,
    senha ?: string ,
    telefone ?: string
}

export default class CadastroController {

    static async salvarUsuario(usuario : usuarioType , res : Response){

        const salt = bcrypt.genSaltSync(10)
        const senha = bcrypt.hashSync(usuario.senha , salt)
        usuario.senha = senha 

        try {
           const resposta = await CadastroModel.salvarUsuario(usuario)
           res.status(201).json(resposta)
        }catch{
            res.status(500).json("Erro do Servidor")
        }
    }

    static async consultarUsuarios(res : Response){

        try {
           const resposta = await CadastroModel.consultarUsuarios()
           res.status(200).json(resposta)
        }catch{
            res.status(500).json("Erro do Servidor")
        }
    }

    static async consultarUsuario( id : string ,res : Response){
        
        const idN = parseInt(id)
        try {
           const resposta = await CadastroModel.consultarUsuario(idN)
           res.status(200).json(resposta)
        }catch{
            res.status(500).json("Erro do Servidor")
        }
    }

    static async excluirUsuario( id : string ,res : Response){
        
        const idN = parseInt(id)
        try {
           const resposta = await CadastroModel.excluirUsuario(idN)
           if(resposta){
               res.status(200).json('Usuario excluido com sucesso!')
           }else{
               res.status(200).json('Usuario não existe!')
           }
        }catch{
            res.status(500).json("Erro do Servidor")
        }
    }

    static async atualizarUsuario( id : string ,usuario : atualizarUsuarioType, res : Response){
        
        const idN = parseInt(id)
        try {
           const resposta = await CadastroModel.atualizarUsuario(usuario , idN)
           if(resposta){
               
               res.status(200).json('Usuario atualizado!')
           }else{
               res.status(200).json('Não foi possivel atualizar')
           }
        }catch{
            res.status(500).json("Erro do Servidor")
        }
    }

   
}