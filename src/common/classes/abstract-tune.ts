import { BaseEntity, Column, PrimaryGeneratedColumn, Unique } from 'typeorm';
import { LanguageEnum } from '../enums/language.enum';

@Unique(['name', 'source'])
export abstract class AbstractTune extends BaseEntity {
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

  @Column({ nullable: true })
  image: string;

  @Column({
    type: 'enum',
    enum: LanguageEnum,
  })
  language: LanguageEnum;
}
