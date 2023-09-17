import { AbstractArtist } from 'src/common/classes/abstract-artist';
import { Entity, Unique } from 'typeorm';

@Entity('musicians')
@Unique(['name'])
export class Musician extends AbstractArtist {}
