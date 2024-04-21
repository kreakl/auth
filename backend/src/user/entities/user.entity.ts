import { Column, Entity, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm';
import { Exclude } from 'class-transformer';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar', { length: 100, unique: true })
  login: string;

  @Exclude()
  @Column('varchar', { length: 100 })
  password: string;

  @Column('varchar', { length: 255, nullable: true })
  fullName?: string;

  @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP(6)' })
  createdAt: Date;
}
