import Express , {Request , Response} from "express";
import CadastroController from "./controller/cadastroController";
import Autenticacao from "./middlewares/autenticacao";

const rota = Express.Router()

rota.post('/cadastrar' , (req : Request , res : Response) => {
    CadastroController.salvarUsuario(req.body , res)
})

rota.post('/logar' ,
    Autenticacao.localStorage ,
    (req : Request , res : Response) => {
    CadastroController.logar(req.body , res)
})



rota.get('/usuarios' , Autenticacao.AutenticacaoToken , (req : Request, res : Response) => {
    CadastroController.consultarUsuarios(res)
} )

rota.get('/usuario/:id' , (req : Request , res : Response) => {
        const {id} = req.params 
        CadastroController.consultarUsuario(id , res)
})

rota.delete('/usuario/:id' , (req : Request , res : Response) => {
    const {id} = req.params 
    CadastroController.excluirUsuario(id , res)
})

rota.put('/usuario/:id' , (req : Request , res : Response) => {
    const {id} = req.params 
    CadastroController.atualizarUsuario(id , req.body, res)
})




export default rota