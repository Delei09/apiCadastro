import { usuarioType } from "../controller/cadastroController";

export default class CadastroRepositores {

    static salvarUsuario(usuario : usuarioType){
        console.log(usuario )
        return 'Usuario salvo'
    }
}