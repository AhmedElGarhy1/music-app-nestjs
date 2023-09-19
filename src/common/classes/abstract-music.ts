import { BaseEntity, Column, PrimaryGeneratedColumn, Unique } from 'typeorm';

@Unique(['name', 'source'])
export abstract class AbstractMusic extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  artist: string;

  @Column()
  rate: number;

  @Column()
  source: string;

  @Column({ type: 'date' })
  publishedIn: string;

  @Column()
  tempImage: string;
}
