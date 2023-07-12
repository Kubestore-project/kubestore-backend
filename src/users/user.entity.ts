import { ApiProperty } from '@nestjs/swagger';
import { BaseEntity } from 'src/base_entity';
import { Column, Entity } from 'typeorm';

export enum UserRole {
  ADMIN = 'admin',
  USER = 'user',
}

@Entity('Users')
export class User extends BaseEntity {
  @ApiProperty({ example: 'user@gmail.com', description: 'User email' })
  @Column({ unique: true, type: 'varchar', length: 100, nullable: false })
  email: string;

  @ApiProperty({ example: 'userPassword', description: 'User password' })
  @Column({ type: 'varchar', length: 100, nullable: false })
  password: string;

  @ApiProperty({ example: '+380969022285', description: 'User mobile phone' })
  @Column({ type: 'varchar', length: 20 })
  phoneNumber: string;

  @Column({ type: 'enum', enum: UserRole, default: UserRole.USER })
  role: UserRole;
}
