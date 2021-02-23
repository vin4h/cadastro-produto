import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('users')
class User {
    @PrimaryColumn('uuid')
    id: string;

    @Column()
    name: string;
    
    @Column()
    email: string;

    @Column()
    password: string;
}

export default User;