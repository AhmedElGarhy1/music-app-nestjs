import { AbstractArtist } from 'src/common/classes/abstract-artist';
import { Entity, Unique } from 'typeorm';

@Entity('singers')
@Unique(['name'])
export class Singer extends AbstractArtist {}
