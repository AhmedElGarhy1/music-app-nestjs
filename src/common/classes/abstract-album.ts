import { BaseEntity, Column, PrimaryGeneratedColumn } from 'typeorm';

export class AbstractAlbum extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ nullable: true })
  image: string;
}
