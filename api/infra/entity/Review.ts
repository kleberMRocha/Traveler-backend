import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
} from 'typeorm';

import {Attractions} from "./Attractions"; 


@Entity()
export class Review {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  customer_name: string;

  @Column()
  review: string;

  @Column()
  img_url: string;

  @Column({default:false})
  isPublished : boolean;

  @ManyToOne(type => Attractions, Attractions => Attractions.review, {
    onDelete: "CASCADE"
  }) 
  attraction: Attractions; 

  @Column({default:5})
  rate: Number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
