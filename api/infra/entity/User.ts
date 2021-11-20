const  {Entity, PrimaryGeneratedColumn, Column} = require("typeorm");

@Entity()
export class User {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    firstName: string;

    @Column({unique: true})
    email: string;

    @Column()
    password: string;

}
