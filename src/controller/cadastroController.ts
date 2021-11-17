import {Response , Request} from 'express'
import CadastroModel from '../models/cadastroModel'
import { Validacao } from './validacaoController'

import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { Usuarios } from '../database/models/usuariosModels'

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

export const palavraSecreta = '474a5cc7e7f44b8bdb9c676e2e1e3236'

export default class CadastroController {

    static async logar(loginUsuario : login , res : Response){

        const token = jwt.sign({usuario : loginUsuario.email} , palavraSecreta) ;
        const usuario = await Usuarios.findOne({where : {email : loginUsuario.email}}) ;
        const  dadosUsuario = await usuario?.get() ;
        res.status(201).json({token , usuario})
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