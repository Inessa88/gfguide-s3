import { Sequelize } from "sequelize";
import db from '../config/db.js'

const {DataTypes} = Sequelize;

const Users = db.define('users',{
    email: {
        type: DataTypes.STRING
    },
    password:{
        type: DataTypes.STRING
    },
    // createdAt:{
    //     field:'createdat'
    // }
    // id creadedAt updatedAt
},
{
    timestamps: false})

export default Users;