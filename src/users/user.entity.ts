import { Entity, Column } from 'typeorm';
import { BaseEntity } from 'src/base_entity';

export enum UserRole {
  ADMIN = 'admin',
  USER = 'user',
}

@Entity('Users')
export class User extends BaseEntity {
  @Column({ unique: true, type: 'varchar', length: 100, nullable: false })
  email: string;

  @Column({ type: 'varchar', length: 20 }) // uniq? nullable?
  phone_number: string;

  @Column({ type: 'varchar', length: 100 })
  password: string;

  @Column({ type: 'enum', enum: UserRole, default: UserRole.USER })
  role: UserRole;
}
