import { app , porta } from "./config/config";

app.listen(porta, () => {
    console.log(`Servidor rodando na porta ${porta}`)
})