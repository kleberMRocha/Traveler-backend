import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

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
}
