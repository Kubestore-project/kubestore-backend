import { BaseEntity } from 'src/base_entity';
import { Column, Entity } from 'typeorm';

@Entity('RefreshTokens')
export class RefreshToken extends BaseEntity {
  @Column({ unique: true, type: 'integer', nullable: false })
  userId: number;

  @Column({ type: 'varchar', length: 250, nullable: false })
  refreshToken: string;
}
