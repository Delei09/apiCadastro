import { Usuarios } from "../database/models/usuariosModels";
import { login, usuarioType } from "./cadastroController";
import bcrypt from 'bcrypt'
import passport from 'passport'
import passportLocal from 'passport-local'

const LocalStrategy = passportLocal.Strategy
export class Validacao {
    
   static  async emailExiste(email : string){
       
       const emailExiste =  await Usuarios.findAll({where : {email : email}})
       return emailExiste.length === 0 ? false : true
    }




}