import { app , porta } from "./config/config";
import {DB} from './database/db'
import {Usuarios} from './database/models/usuariosModels'

Usuarios.sync()
app.listen(porta, async () => {

    await DB.sync()
    console.log(`Servidor rodando na porta ${porta}`)
})