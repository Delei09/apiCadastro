import { Usuarios } from "../database/models/usuariosModels";

export class Validacao {
    
   static  async emailExiste(email : string){
       const emailExiste =  await Usuarios.findAll({where : {email : email}})
       return emailExiste.length === 0 ? false : true
    }
}