import { Column, Entity, JoinColumn, OneToOne, PrimaryColumn } from 'typeorm';
import { User } from '@/user/entities/user.entity';

@Entity('tokens')
export class Token {
  @PrimaryColumn()
  userId: number;

  @Column({ nullable: true })
  refreshToken?: string;

  @OneToOne(() => User, { onDelete: 'CASCADE' })
  @JoinColumn()
  user: User;

  @Column({ type: 'date' })
  exp: string;
}
