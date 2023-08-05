import { AbstractArtist } from "src/common/classes/abstract-artist";
import { Entity } from "typeorm";


@Entity('musicians')
export class Musician extends AbstractArtist {

}