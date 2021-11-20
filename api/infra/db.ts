import {createConnection} from "typeorm";
import {User} from "./entity/User";
import bcrypt from 'bcrypt';
require('dotenv').config();

createConnection()
    .then(async connection => {

    const user = new User();
    const users = await connection.manager.find(User);

     // criar usuer admin caso não exista
     if(!users.length){

        const initialPassword = process.env.NODE_INITIAL_PASSWORD;
        const saltRounds = 10;

        bcrypt.genSalt(saltRounds, (err, salt) => {
            if(err){
                console.log('Houve um erro ao criar o usuário inicial');
                return;
            }

            bcrypt.hash(initialPassword, salt, async function(err, hash) {

                user.firstName = "admin";
                user.email = "admin@email.com";
                user.password = hash;

                await connection.manager.save(user);
            });

        });

        console.log('Usuário inicial criado com sucesso! ');
    }

    console.log('Conexão com o banco de dados feita com sucesso!');

}).catch(error => console.log(error));