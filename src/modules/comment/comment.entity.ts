import {
  Column, CreateDateColumn, Entity, ManyToOne, PrimaryColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Post } from '../post/post.entity';
import { Character } from '../character/character.entity';
import { v4 as uuid } from 'uuid';
import { Corporation } from '../corporation/corporation.entity';
import { Alliance } from '../alliance/alliance.entity';

@Entity()
export class Comment {

  constructor() {
  }

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text')
  content: string;

  @CreateDateColumn()
  createdAt: Date;

  @ManyToOne(type => Post, post => post.comments)
  post: Post;

  @ManyToOne(type => Character, character => character.comments, { nullable: true, eager: true })
  character?: Character;

  @ManyToOne(type => Corporation, corporation => corporation.comments, { nullable: true, eager: true })
  corporation?: Corporation;

  @ManyToOne(type => Alliance, alliance => alliance.comments, { nullable: true, eager: true })
  alliance?: Alliance;

}
