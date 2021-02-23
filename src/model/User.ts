import { Column, PrimaryColumn } from 'typeorm';

class User {
    @PrimaryColumn('uuid')
    id: string;

    @Column()
    name: string;
    
    @Column()
    email: string;
}

export default User;