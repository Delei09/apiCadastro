import { atualizarUsuarioType, usuarioType } from "../controller/cadastroController";
import CadastroRepositores from "../repositories/cadastroRepositories";

export default class CadastroModel {

    static async salvarUsuario(usuario : usuarioType){
        return await  CadastroRepositores.salvarUsuario(usuario)
    }

    static async consultarUsuarios(){
        return await  CadastroRepositores.consultarUsuaruis()
    }

    static async consultarUsuario(id : number){
        return await  CadastroRepositores.consultarUsuario(id)
    }


    static async excluirUsuario(id : number){
        return await  CadastroRepositores.excluirUsuario(id)
    }

    static async atualizarUsuario(dados: atualizarUsuarioType ,id : number){
        return await  CadastroRepositores.atualizarUsuario(id , dados)
    }
}
