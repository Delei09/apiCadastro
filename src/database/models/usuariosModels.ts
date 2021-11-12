import { DataTypes } from "sequelize";
import { DB } from "../db";

export const Usuarios = DB.define("usuarios" , {
    id : {
        type : DataTypes.INTEGER ,
        autoIncrement : true ,
        allowNull : false ,
        primaryKey : true
    },
    nome : {
        type : DataTypes.STRING ,
        allowNull : false
    },
    email : {
        type : DataTypes.STRING ,
        allowNull : false
    },
    telefone : {
        type : DataTypes.STRING ,
        allowNull : false
    },
    senha : {
        type : DataTypes.STRING ,
        allowNull : false
    }
})