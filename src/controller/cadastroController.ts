import {Response , Request} from 'express'
import bcrypt from 'bcrypt'
import CadastroModel from '../models/cadastroModel'
import { Validacao } from './validacaoController'

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

export type login = {
    email : string ,
    senha : string
}

export default class CadastroController {

    static async logar(usuario : usuarioType , res : Response){

        try {
            const emailExiste = await  Validacao.emailExiste(usuario.email)
            if(emailExiste){
                const senhaIgual = await Validacao.logar(usuario)
                if(senhaIgual){
                    res.status(200).json('Usuario Logado')
                }else{
                    throw ('Senha ou Email errado')
                }
            }else{
                throw ('Email não existe.')
            }
        }catch(erro){
            res.status(400).json(erro)
        }
    }

    static async salvarUsuario(usuario : usuarioType , res : Response){

        const salt = bcrypt.genSaltSync(10)
        const senha = bcrypt.hashSync(usuario.senha , salt)
        usuario.senha = senha 
        try {

            if(await Validacao.emailExiste(usuario.email) ){
                throw ('Email já existe!') 
             }

           const resposta = await CadastroModel.salvarUsuario(usuario)
           res.status(201).json(resposta)
        }catch(erro){
            res.status(500).json(erro)
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
            if(usuario.email){
                if(await Validacao.emailExiste(usuario.email) ){
                    throw ('Email já existe!') 
                 }
            }
           const resposta = await CadastroModel.atualizarUsuario(usuario , idN)
           if(resposta){
               
               res.status(200).json('Usuario atualizado!')
           }else{
               res.status(200).json('Não foi possivel atualizar')
           }
        }catch(erro){
            res.status(500).json(erro)
        }
    }

   
}