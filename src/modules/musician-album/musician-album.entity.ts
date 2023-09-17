import { AbstractAlbum } from 'src/common/classes/abstract-album';
import { Entity } from 'typeorm';

@Entity()
export class MusicianAlbum extends AbstractAlbum {}
