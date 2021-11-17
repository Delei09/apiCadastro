import { NextFunction , Response , Request } from "express";
import { login, palavraSecreta } from "../controller/cadastroController";
import { Usuarios } from "../database/models/usuariosModels";
import bcrypt from 'bcrypt'
import jwt from "jsonwebtoken";
import { json } from "stream/consumers";
import { type } from "os";


export default class Autenticacao{

    static async localStorage(req  : Request , res : Response , next : NextFunction){

      const usuario : login = req.body
      const UsuarioExiste = await Usuarios.findOne({where : {email : usuario.email}})
        if(!UsuarioExiste){
            return res.status(400).send({erro : 'Usuario não Existe'})
        }
        const {senha} = UsuarioExiste.get()
        const senhaIgual = await bcrypt.compare(usuario.senha ,  senha)
        if(!senhaIgual){
            return res.status(400).send({erro : 'Email ou Senha incorreto'})
        }
        next()
    }

    static async AutenticacaoToken(req  : Request , res : Response , next : NextFunction){
        
        try{
            const token  = req.headers['auth'] ;
            if(token){
                const tokenString = String(token)
             jwt.verify(tokenString , palavraSecreta, (erro, ok) => {
                 if(erro){
                    console.log('Erro do token')
                 }else{
                     console.log('Deu certo graça a Deus')
                 }
             })
            }
            next()
        }catch(erro){
            res.status(400).json(erro)
        }
       

    }
}