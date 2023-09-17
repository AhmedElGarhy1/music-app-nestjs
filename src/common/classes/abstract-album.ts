import { BaseEntity, Column, PrimaryGeneratedColumn } from 'typeorm';

export class AbstractAlbum {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  image: string;
}
