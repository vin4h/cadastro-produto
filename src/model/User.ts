import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';
import Product from './Product';

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

    @OneToMany(() => Product, product => product.user)
    products: Product[];
}

export default User;