import { BaseEntity } from 'src/base_entity';
import { Column, Entity } from 'typeorm';

@Entity('RefreshTokens')
export class RefreshToken extends BaseEntity {
  //   @ApiProperty({ example: 'user@gmail.com', description: 'User email' })
  @Column({ unique: true, type: 'varchar', length: 200, nullable: false })
  token: string;

  @Column({ type: 'integer', nullable: false })
  userId: number;
}
