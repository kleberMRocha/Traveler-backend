import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';

import {Attractions} from "./Attractions"; 

@Entity()
export class Place {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  place_name: string;

  @Column()
  place_desc: string;

  @Column()
  img_url: string;

  @OneToMany(type => Attractions, attractions => attractions.place) 
  attraction: Attractions[];  

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
