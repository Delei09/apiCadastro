import { usuarioType ,atualizarUsuarioType } from "../controller/cadastroController";
import { Usuarios } from "../database/models/usuariosModels";
export default class CadastroRepositores {

    static async salvarUsuario(usuario : usuarioType){
        return await  Usuarios.create(usuario)
    }

    static async consultarUsuaruis(){
        return await Usuarios.findAll()
    }

    static async consultarUsuario(usuario : number){
    
        return await Usuarios.findOne({
            where : {
                id : usuario
            }
        })
    }

    static async excluirUsuario(usuario : number){
    
        return await Usuarios.destroy({
            where : {
                id : usuario
            }
        })
    }

    static async atualizarUsuario(id : number , dados : atualizarUsuarioType){
    
        return await Usuarios.update(dados , {
            where : {
                id : id
            }
        })
    }
}