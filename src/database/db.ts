import { Sequelize } from "sequelize";

export const DB = new Sequelize('Cadastro' , 'root' , 'root' , {
    dialect : "mysql" ,
    host : "localhost" ,
}) 