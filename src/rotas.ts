import Express , {Request , Response} from "express";
import CadastroController from "./controller/cadastroController";

const rota = Express.Router()

rota.get('/cadastrar' , (req : Request, res : Response) => {
    
    res.status(200).json('Rota cadastro ok')
} )

rota.post('/cadastrar' , (req : Request , res : Response) => {
    CadastroController.salvarUsuario(req.body , res)
})



export default rota