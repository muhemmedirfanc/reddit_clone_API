import { IsEmail, Length, length } from 'class-validator';
import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, Index, CreateDateColumn, UpdateDateColumn, BeforeInsert } from 'typeorm';
import { instanceToPlain, Exclude } from 'class-transformer';
import bcrypt from 'bcryptjs';

@Entity('users')
export class User extends BaseEntity {
  constructor(user: Partial<User>) {
    super();
    Object.assign(this, user);
  }

  @Exclude()
  @PrimaryGeneratedColumn()
  id: number;

  @Index()
  @IsEmail()
  @Column({ unique: true, nullable: false })
  email: string;

  @Index()
  @Length(3, 10, { message: 'Username must be greater than 3 letters and less than 10 letters.' })
  @Column({ unique: true, nullable: false })
  username: string;

  @Exclude()
  @Column({ nullable: false })
  @Length(8, 50, { message: 'Password must be greater than 8 characters.' })
  password: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @BeforeInsert()
  //hash password
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 6);
  }

  toJSON() {
    return instanceToPlain(this);
  }
}
