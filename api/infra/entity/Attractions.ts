import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';

import {Place} from "./Place"; 
import {Review} from './Review';

@Entity()
export class Attractions {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  attraction_name: string;

  @Column()
  attraction_desc: string;

  @Column()
  img_url: string;

  @Column()
  attraction_type: number;

  @Column()
  location: string;

  @ManyToOne(type => Place, place => place.attraction, {
    onDelete: "CASCADE"
  }) 
  place: Place; 

  @OneToMany(type => Review, Review => Review.attraction) 
  review: Attractions[];  

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
