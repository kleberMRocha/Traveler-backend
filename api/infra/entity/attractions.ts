import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

import {Place} from "./Place"; 


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

  @ManyToOne(type => Place, place => place.attraction) 
  place: Place; 

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
