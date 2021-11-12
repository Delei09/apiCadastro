import { Usuarios } from "../database/models/usuariosModels";
import { login, usuarioType } from "./cadastroController";
import bcrypt from 'bcrypt'
export class Validacao {
    
   static  async emailExiste(email : string){
       const emailExiste =  await Usuarios.findAll({where : {email : email}})
       return emailExiste.length === 0 ? false : true
    }

    static async logar(usuario : login ){
            const usuarioLogin  = await Usuarios.findOne( { where : { "email" : usuario.email } } )
            const dados = usuarioLogin?.get();
            const senhaBanco = dados.senha;
            return bcrypt.compareSync(usuario.senha, senhaBanco)
    }

}