import { usuarioType } from "../controller/cadastroController";
import CadastroRepositores from "../repositories/cadastroRepositories";

export default class CadastroModel {

    static salvarUsuario(usuario : usuarioType){
        return CadastroRepositores.salvarUsuario(usuario)
    }
}