import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Users {
  @PrimaryGeneratedColumn() // auto-incrementing primary key
  id: number;

  @Column()
  full_name: string;

  @Column()
  username: string;

  @Column()
  email: string;

  @Column()
  password: string;
}
